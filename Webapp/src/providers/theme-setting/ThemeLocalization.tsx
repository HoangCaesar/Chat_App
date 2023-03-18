import PropTypes from 'prop-types';
// @mui
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
// hooks
import { useLocales } from '../../hooks';

// ==============================|| THEME-SETTING: THEME CONTRAST ||============================== //

const ThemeLocalization = ({ children }: any) => {
    const defaultTheme = useTheme();

    const { currentLang } = useLocales();

    const theme = createTheme(defaultTheme, currentLang.systemValue);

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

ThemeLocalization.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ThemeLocalization;
