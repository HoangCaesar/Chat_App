import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Project Import
import App from './App';

// ==============================|| MAIN: SETTING-ROUTER-HELMET PROVIDER  ||============================== //

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <HelmetProvider>
            <Router>
                <App />
            </Router>
        </HelmetProvider>
    </React.StrictMode>
);
