import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// Project Import
import { useResponsive } from '../../hooks';
import { useAppDispatch, useAppSelector } from '../../hooks/sagaHooks';
import { connectSocket, socket } from '../../socket';
import { authSelectIsLoggedIn } from '../../store/reducers/auth/auth.slice';
import {
    conversationActions
} from '../../store/reducers/conversation/conversation.slice';
import { isAuthenticated } from '../../utils/authHandler';
import SideBar from './SideBar';

// ==============================|| LAYOUT: DASHBOARD ||============================== //

const DashboardLayout = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(authSelectIsLoggedIn);

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

        if (isLoggedIn) {
            socket.emit('greeting_message', {
                user_id,
                location,
            });
        }

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
