import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

// Project Import
import { FormProvider, RHFTextField } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/sagaHooks';
import { authActions, authSelectIsLoading } from '../../store/reducers/auth/auth.slice';

// ----------------------------------------------------------------------

const AuthResetPasswordForm = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(authSelectIsLoading);

    const ResetPasswordSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email must be a valid email address'),
    });

    const methods = useForm({
        resolver: yupResolver(ResetPasswordSchema),
        defaultValues: { email: 'caesar@nets.com' },
    });

    const { handleSubmit } = methods;

    const onSubmit = async (data: any) => {
        try {
            //   Send API Request
            dispatch(authActions.ForgotPassword(data))
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField name="email" label="Email address" />

            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isLoading}
                sx={{
                    mt: 3,
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
                Send Request
            </LoadingButton>
        </FormProvider>
    );
};

export default AuthResetPasswordForm;
