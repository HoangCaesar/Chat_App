import { Stack } from '@mui/system';
import React from 'react';

// Project Import
import Chats from './Chats';

// ==============================|| PAGE: MAIN APP  ||============================== //

const MainApp = () => {
    return (
        <>
            <Stack direction="row" sx={{ width: "100%" }} >
                <Chats />
            </Stack>
        </>
    );
};

export default MainApp;
