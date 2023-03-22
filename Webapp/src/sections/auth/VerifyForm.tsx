import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Button, Stack } from '@mui/material';

// Project Import
import { FormProvider, RHFCodes } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/sagaHooks';
import {
    authActions,
    authSelectEmail,
    authSelectIsLoading,
} from '../../store/reducers/auth/auth.slice';

const VerifyForm = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(authSelectIsLoading);
    const email = useAppSelector(authSelectEmail);

    const VerifyCodeSchema = Yup.object().shape({
        code1: Yup.string().required('Code is required'),
        code2: Yup.string().required('Code is required'),
        code3: Yup.string().required('Code is required'),
        code4: Yup.string().required('Code is required'),
        code5: Yup.string().required('Code is required'),
        code6: Yup.string().required('Code is required'),
    });

    const defaultValues = {
        code1: '',
        code2: '',
        code3: '',
        code4: '',
        code5: '',
        code6: '',
    };

    const methods = useForm({
        mode: 'onChange',
        resolver: yupResolver(VerifyCodeSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
    } = methods;

    const onSubmit = async (data: any) => {
        try {
            //   Send API Request
            dispatch(
                authActions.VerifyOTP({
                    email,
                    otp: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`,
                })
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <RHFCodes
                    keyName="code"
                    inputs={['code1', 'code2', 'code3', 'code4', 'code5', 'code6']}
                />

                <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
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
                    Verify
                </Button>
            </Stack>
        </FormProvider>
    );
};

export default VerifyForm;
