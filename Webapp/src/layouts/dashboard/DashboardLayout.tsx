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
    const location: any = localStorage.getItem('location');

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

        window.onload = function () {
            if (!window.location.hash) {
                window.location = (window.location + '#loaded') as any;
                window.location.reload();
            }
        };

        const ev: any = {};

        window.onload(ev);

        socket.emit('greeting_message', {
            user_id,
            location
        })

        socket.on('new_message', (data: any) => {
            console.log(1);
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
            socket?.off('greeting_message');
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
