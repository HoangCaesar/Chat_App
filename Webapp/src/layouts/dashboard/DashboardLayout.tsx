import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// Project Import
import { useResponsive } from '../../hooks';
import { connectSocket, socket } from '../../socket';
import { isAuthenticated } from '../../utils/authHandler';
import SideBar from './SideBar';
import { useAppDispatch, useAppSelector } from '../../hooks/sagaHooks';
import {
    conversationSelectDirectChat,
    conversationActions,
} from '../../store/reducers/conversation/conversation.slice';
import { appActions } from '../../store/reducers/app/app.slice';

// ==============================|| LAYOUT: DASHBOARD ||============================== //

const DashboardLayout = () => {
    const dispatch = useAppDispatch();
    const { conversations, current_conversation } = useAppSelector(conversationSelectDirectChat);

    const navigate = useNavigate();

    const isDesktop = useResponsive('up', 'md');

    const user_id: any = localStorage.getItem('uid');

    useEffect(() => {
        const checkToken = (async () => {
            const res = await isAuthenticated();
            if (!res) return navigate('/auth/signin');
        })();
    }, []);

    // socket
    useEffect(() => {
        if (!socket) {
            connectSocket(user_id);
        }

        socket.on('new_message', (data: any) => {
            const message = data.message;
            console.log(current_conversation, data);
            // check if msg we got is from currently selected conversation
            if (current_conversation.id === data.conversation_id) {
                dispatch(
                    conversationActions.addDirectMessage({
                        id: message._id,
                        type: 'msg',
                        subtype: message.type,
                        message: message.text,
                        incoming: message.to === user_id,
                        outgoing: message.from === user_id,
                    })
                );
            }
        });

        return () => {
        };
    }, [socket]);

    return (
        <>
            <Stack direction="row">
                {isDesktop && <SideBar />}
                <Outlet />
            </Stack>
        </>
    );
};

export default DashboardLayout;
