import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Alert, Link, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';

// Project Import
import { FormProvider, RHFTextField } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/sagaHooks';
import { UserLogin } from '../../model';
import { authActions, authSelectIsLoading } from '../../store/reducers/auth/auth.slice';
import getLocationName from '../../utils/getLocation';

const AuthLoginForm = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(authSelectIsLoading);

    const [showPassword, setShowPassword] = useState(false);
    const [userLocation, setUserLocation] = useState<string>('');

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const location = await getLocationName({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setUserLocation(location);
                },
                (error) => {
                    console.log(error.message);
                }
            );
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    }, []);

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
        formState: { errors },
    }: any = methods;

    const onSubmit = async (data: UserLogin) => {
        try {
            data = {
                ...data,
                location: userLocation,
            };
            if(!userLocation) {
                localStorage.setItem('location', 'Mars')
            }
            localStorage.setItem('location', userLocation)
            // submit data to backend
            dispatch(authActions.LoginUser(data));
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
                Login
            </LoadingButton>
        </FormProvider>
    );
};

export default AuthLoginForm;
