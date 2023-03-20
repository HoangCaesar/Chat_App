import { useState } from 'react';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Button, Stack } from '@mui/material';

// Project Import
import { FormProvider, RHFTextField } from '../../components';

const NewPasswordForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    const NewPasswordSchema = Yup.object().shape({
        password: Yup.string()
            .min(5, 'Password must be at least 5 characters')
            .required('Password is required'),
        passwordConfirm: Yup.string()
            .required('Confirm password is required')
            .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
    });

    const defaultValues = {
        password: '',
        passwordConfirm: '',
    };

    const methods = useForm({
        mode: 'onChange',
        resolver: yupResolver(NewPasswordSchema),
        defaultValues,
    });

    const { handleSubmit } = methods;

    const onSubmit = async (data: any) => {
        try {
            //   Send API Request
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <RHFTextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                />

                <RHFTextField
                    name="passwordConfirm"
                    label="Confirm New Password"
                    type={showPassword ? 'text' : 'password'}
                />

                <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
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
                    Update Password
                </Button>
            </Stack>
        </FormProvider>
    );
};

export default NewPasswordForm;
