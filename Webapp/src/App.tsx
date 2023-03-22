import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { forwardRef } from 'react';

// Project Import
import ThemeSettings from './providers/theme-setting';
import AppRoute from './routes';
import ThemeProvider from './theme';
import { useAppDispatch, useAppSelector } from './hooks/sagaHooks';
import { appActions, appSelectSnackbar } from './store/reducers/app/app.slice';

// Helpers
const vertical = 'bottom';
const horizontal = 'center';

const Alert: any = forwardRef((props, ref) => (
    <MuiAlert elevation={6} ref={ref as any} variant="filled" {...props} />
));

// ==============================|| APP: APPLY THEME PROVIDER  ||============================== //

function App() {
    const dispatch = useAppDispatch();

    const { severity, message, open } = useAppSelector(appSelectSnackbar);

    return (
        <>
            <ThemeProvider>
                <ThemeSettings>
                    <AppRoute />
                </ThemeSettings>
            </ThemeProvider>
            {/* Snack Bar */}
            {message && open ? (
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    autoHideDuration={4000}
                    key={vertical + horizontal}
                    onClose={() => {
                        dispatch(appActions.closeSnackBar());
                    }}
                >
                    <Alert
                        onClose={() => {
                            console.log('This is clicked');
                            dispatch(appActions.closeSnackBar());
                        }}
                        severity={severity}
                        sx={{ width: '100%' }}
                    >
                        {message}
                    </Alert>
                </Snackbar>
            ) : (
                <></>
            )}
        </>
    );
}

export default App;
