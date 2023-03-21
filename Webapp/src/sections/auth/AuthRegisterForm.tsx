import { useState } from 'react';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Alert, Stack } from '@mui/material';

// Project Import
import { FormProvider, RHFTextField } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/sagaHooks';
import { authActions, authSelectIsLoading } from '../../store/reducers/auth/auth.slice';

const AuthRegisterForm = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(authSelectIsLoading);

    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        firstName: Yup.string().required('First name required'),
        lastName: Yup.string().required('Last name required'),
        email: Yup.string()
            .required('Email is required')
            .email('Email must be a valid email address'),
        password: Yup.string().required('Password is required').max(256).min(5),
    });

    const defaultValues = {
        firstName: '',
        lastName: '',
        email: 'demo@tawk.com',
        password: 'demo1234',
    };

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const {
        reset,
        setError,
        handleSubmit,
        formState: { errors },
    }: any = methods;

    const onSubmit = async (data: any) => {
        try {
            // submit data to backend
            dispatch(authActions.RegisterUser(data));
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
            <Stack spacing={3} mb={4}>
                {!!errors.afterSubmit && (
                    <Alert severity="error">{errors.afterSubmit.message}</Alert>
                )}

                <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={2}>
                    <RHFTextField name="firstName" label="First name" />
                    <RHFTextField name="lastName" label="Last name" />
                </Stack>

                <RHFTextField name="email" label="Email address" />

                <RHFTextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                />
            </Stack>

            <LoadingButton
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                loading={isLoading}
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
                Create Account
            </LoadingButton>
        </FormProvider>
    );
};

export default AuthRegisterForm;
