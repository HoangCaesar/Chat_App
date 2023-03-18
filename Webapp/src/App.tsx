// Project Import
import AppRoute from './routes';
import ThemeProvider from './theme';
import ThemeSettings from './providers/theme-setting';

// ==============================|| APP: APPLY THEME PROVIDER  ||============================== //

function App() {
    return (
        <ThemeProvider>
            <ThemeSettings>
                <AppRoute />
            </ThemeSettings>
        </ThemeProvider>
    );
}

export default App;
