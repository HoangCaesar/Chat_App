import { Stack } from '@mui/system';

// Project Import
import Chats from './Chats';
import Messenger from './main-messenger';

// ==============================|| PAGE: GROUP APP  ||============================== //

const GroupApp = () => {
    console.log(1);
    return (
        <>
            <Stack direction="row" sx={{ width: '100%' }}>
                {/* Chat Bar */}
                <Chats />
                {/* Body */}
                <Messenger  />
            </Stack>
        </>
    );
};

export default GroupApp;
