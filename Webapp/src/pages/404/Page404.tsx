import { Container, makeStyles, Stack, styled, Typography } from '@mui/material';

// ==============================|| PAGE: 404  ||============================== //

const Page404 = () => {
    return (
        <Container maxWidth="sm" sx={{ height: '100%' }} >
            <Stack alignItems={'center'} justifyContent={'center'} >
                <Typography variant="h4">404 Not Found</Typography>
                <Typography variant="body1">
                    The page you are looking for does not exist.
                </Typography>
            </Stack>
        </Container>
    );
};

export default Page404;
