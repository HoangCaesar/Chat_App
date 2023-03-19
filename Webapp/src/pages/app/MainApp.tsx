import { Stack } from '@mui/system';
import React from 'react';

// Project Import
import Chats from './Chats';
import Messenger from './main-messenger';

// ==============================|| PAGE: MAIN APP  ||============================== //

const MainApp = () => {
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

export default MainApp;
