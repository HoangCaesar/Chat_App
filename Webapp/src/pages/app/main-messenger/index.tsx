import { Box, Stack } from '@mui/material';

// Project Import
import Body from './Body';
import Footer from './Footer';
import Header from './Header';

// ==============================|| MAIN APP: MAIN MESSENGER  ||============================== //

const Messenger = () => {
    return (
        <Stack height={'100%'} maxHeight={'100vh'} sx={{ flexGrow: 1 }} width="auto">
            {/* Header */}
            <Header />

            {/* Body */}
            <Body />

            {/* Footer */}
            <Footer />
        </Stack>
    );
};

export default Messenger;
