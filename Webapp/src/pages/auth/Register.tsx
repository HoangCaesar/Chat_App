import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Link, Stack, Typography } from '@mui/material';

// Project Import
import { AuthRegisterForm, AuthSocial } from '../../sections';

// ==============================|| PAGE: REGISTER  ||============================== //

const Register = () => {
    return (
        <>
            <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
                <Typography variant="h4">Get started with Nets.</Typography>

                <Stack direction="row" spacing={0.5}>
                    <Typography variant="body2"> Already have an account? </Typography>

                    <Link component={RouterLink} to={'/auth/signin'} variant="subtitle2">
                        Sign in
                    </Link>
                </Stack>
            </Stack>
            {/* Form */}
            <AuthRegisterForm />

            <Typography
                component="div"
                sx={{ color: 'text.secondary', mt: 3, typography: 'caption', textAlign: 'center' }}
            >
                {'By signing up, I agree to '}
                <Link underline="always" color="text.primary">
                    Terms of Service
                </Link>
                {' and '}
                <Link underline="always" color="text.primary">
                    Privacy Policy
                </Link>
                .
            </Typography>

            <AuthSocial />
        </>
    );
};

export default Register;
