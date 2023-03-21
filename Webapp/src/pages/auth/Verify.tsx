// sections
import { Stack, Typography } from '@mui/material';

// Project Import
import { VerifyForm } from '../../sections';

// ==============================|| PAGE: VERIFY  ||============================== //

const VerifyPage = () => {
    return (
        <>
            <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
                <Typography variant="h4">Please Verify OTP</Typography>

                <Stack direction="row" spacing={0.5}>
                    <Typography variant="body2">Sent to email</Typography>
                </Stack>
            </Stack>
            {/* Form */}
            <VerifyForm />
        </>
    );
};

export default VerifyPage;
