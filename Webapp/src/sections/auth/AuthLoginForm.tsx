import { useState } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Eye, EyeSlash } from 'phosphor-react';

// Project Import
import { FormProvider, RHFTextField } from '../../components';

// ----------------------------------------------------------------------

const AuthLoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email must be a valid email address'),
        password: Yup.string().max(256).min(5).required('Password is required'),
    });

    const defaultValues = {
        email: 'caesar@nets.com',
        password: 'caesar5899',
    };

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const {
        reset,
        setError,
        handleSubmit,
        formState: { errors } ,
    }: any = methods;

    const onSubmit = async (data: any) => {
        try {
            console.log(data);
            // submit data to backend
        } catch (error: any) {
            console.error(error);
            reset();
            setError('root', {
                ...error,
                message: error.message,
            });
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                {!!errors.afterSubmit && (
                    <Alert severity="error">{errors.afterSubmit.message}</Alert>
                )}

                <RHFTextField name="email" label="Email address" />

                <RHFTextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                />
            </Stack>

            <Stack alignItems="flex-end" sx={{ my: 2 }}>
                <Link
                    component={RouterLink}
                    to="/auth/reset-password"
                    variant="body2"
                    color="inherit"
                    underline="always"
                >
                    Forgot password?
                </Link>
            </Stack>

            <LoadingButton
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                sx={{
                    bgcolor: 'text.primary',
                    color: (theme) =>
                        theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                    '&:hover': {
                        bgcolor: 'text.primary',
                        color: (theme) =>
                            theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                    },
                }}
            >
                Login
            </LoadingButton>
        </FormProvider>
    );
};

export default AuthLoginForm;
