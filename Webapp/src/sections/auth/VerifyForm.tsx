import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Button, Stack } from '@mui/material';

// Project Import
import { FormProvider, RHFCodes } from '../../components';

const VerifyForm = () => {
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
            console.log(data);
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
}

export default VerifyForm