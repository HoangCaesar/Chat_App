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
    const current_conversation_id: any = localStorage.getItem('current_conversation_id');

    useEffect(() => {
        const checkToken = (async () => {
            const res = await isAuthenticated();
            if (!res) return navigate('/auth/signin');
        })();
    }, []);

    // socket
    useEffect(() => {
        window.onload = function () {
            if (!window.location.hash) {
                window.location = (window.location + '#loaded') as any;
                window.location.reload();
            }
        };

        const ev: any = {};

        window.onload(ev);

        if (!socket) {
            connectSocket(user_id);
        }

        socket.on('new_message', (data: any) => {
            const message = data.message;
            dispatch(
                conversationActions.addDirectMessage({
                    id: message.messages._id,
                    type: 'msg',
                    subtype: message.messages.type,
                    message: message.messages.text,
                    incoming: message.messages.to === user_id,
                    outgoing: message.messages.from === user_id,
                })
            );
        });

        return () => {
            socket?.off('new_message');
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
