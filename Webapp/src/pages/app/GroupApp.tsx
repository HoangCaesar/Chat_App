import { Stack } from '@mui/system';
import { useParams } from 'react-router-dom';

// Project Import
import Chats from './Chats';
import Messenger from './main-messenger';

// ==============================|| PAGE: GROUP APP  ||============================== //

const GroupApp = () => {
    const params = useParams()
    const serverID = params.serverID;
    const userID: any = localStorage.getItem('uid');
    return (
        <>
            <Stack direction="row" sx={{ width: '100%' }}>
                {/* Chat Bar */}
                {/* <Chats /> */}
                {/* Body */}
                {/* <Messenger  /> */}
            </Stack>
        </>
    );
};

export default GroupApp;
