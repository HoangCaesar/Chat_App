// routes
// Project Import
import Router from './routes';
import ThemeProvider from './theme';

// ==============================|| APP: APPLY THEME PROVIDER  ||============================== //

function App() {
    return (
        <ThemeProvider>
            <Router />
        </ThemeProvider>
    );
}

export default App;
