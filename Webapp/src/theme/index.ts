import PropTypes from 'prop-types';
import { useMemo } from 'react';
// @mui
import { CssBaseline } from '@mui/material';
import {
    createTheme,
    ThemeProvider as MUIThemeProvider,
    StyledEngineProvider,
    Theme,
} from '@mui/material/styles';

// Project Import
// hooks
// theme
import breakpoints from './breakpoints';
import palette from './palette';
import typography from './typography';
import shadows, { customShadows } from './shadows';
import componentsOverride from './overrides';

// ==============================|| THEME PROVIDER ||============================== //

ThemeProvider.propTypes = {
    children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
    const { themeMode, themeDirection } = useSettings();

    const isLight = themeMode === 'light';

    const themeOptions = useMemo(
        () => ({
            palette: isLight ? palette.light : palette.dark,
            typography,
            breakpoints,
            shape: { borderRadius: 8 },
            direction: themeDirection,
            shadows: isLight ? shadows.light : shadows.dark,
            customShadows: isLight ? customShadows.light : customShadows.dark,
        }),
        [isLight, themeDirection]
    );

    const theme: Theme = createTheme(themeOptions);

    theme.components = componentsOverride(theme);

    return (
        <StyledEngineProvider injectFirst>
            <MUIThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MUIThemeProvider>
        </StyledEngineProvider>
    );
}
