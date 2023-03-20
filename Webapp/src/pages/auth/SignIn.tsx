import { Link as RouterLink } from 'react-router-dom';
// sections
import { Stack, Typography, Link } from '@mui/material';

// Project Import
import { AuthLoginForm, AuthSocial } from '../../sections';

// ==============================|| PAGE: SIGN IN  ||============================== //
const SignIn = () => {
    return (
        <>
            <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
                <Typography variant="h4">Login to Nets</Typography>

                <Stack direction="row" spacing={0.5}>
                    <Typography variant="body2">New user?</Typography>

                    <Link to={'/auth/register'} component={RouterLink} variant="subtitle2">
                        Create an account
                    </Link>
                </Stack>
            </Stack>
            {/* Form */}
            <AuthLoginForm />

            <AuthSocial />
        </>
    );
};

export default SignIn;
