import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// redux provider
import { Provider as ReduxProvider } from 'react-redux';

// Project Import
import App from './App';
import SettingsProvider from './providers/SettingProvider';
import { store } from './store';

// new router
import { CustomRouter as Router } from './hooks'

// ==============================|| MAIN: SETTING-ROUTER-HELMET PROVIDER  ||============================== //

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <HelmetProvider>
            <SettingsProvider>
                <ReduxProvider store={store}>
                    <Router>
                        <App />
                    </Router>
                </ReduxProvider>
            </SettingsProvider>
        </HelmetProvider>
    </React.StrictMode>
);
