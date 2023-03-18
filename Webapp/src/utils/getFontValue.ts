// @mui
import { useTheme } from '@mui/material/styles';
// hooks
import useResponsive from '../hooks/useResponsive';

// ==============================|| UTILS: GET FONT VALUE ||============================== //

const GetFontValue = (variant: any) => {
    const theme: any = useTheme();

    const breakpoints = useWidth();

    const key = theme.breakpoints.up(breakpoints === 'xl' ? 'lg' : breakpoints);

    const hasResponsive =
        variant === 'h1' ||
        variant === 'h2' ||
        variant === 'h3' ||
        variant === 'h4' ||
        variant === 'h5' ||
        variant === 'h6';

    const getFont =
        hasResponsive && theme.typography[variant][key]
            ? theme.typography[variant][key]
            : theme.typography[variant];

    const fontSize = remToPx(getFont.fontSize);

    const lineHeight = Number(theme.typography[variant].lineHeight) * fontSize;

    const { fontWeight } = theme.typography[variant];

    const { letterSpacing } = theme.typography[variant];

    return { fontSize, lineHeight, fontWeight, letterSpacing };
};

// ----------------------------------------------------------------------

const remToPx = (value: string) => {
    return Math.round(parseFloat(value) * 16);
};

const pxToRem = (value: number) => {
    return `${value / 16}rem`;
};

const responsiveFontSizes = ({ sm, md, lg }: { sm: number; md: number; lg: number }) => {
    return {
        '@media (min-width:600px)': {
            fontSize: pxToRem(sm),
        },
        '@media (min-width:900px)': {
            fontSize: pxToRem(md),
        },
        '@media (min-width:1200px)': {
            fontSize: pxToRem(lg),
        },
    };
};

// ----------------------------------------------------------------------

const useWidth = () => {
    const theme = useTheme();

    const keys = [...theme.breakpoints.keys].reverse();

    return (
        keys.reduce((output: any, key: any) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const matches = useResponsive('up', key);

            return !output && matches ? key : output;
        }, null) || 'xs'
    );
};

export default GetFontValue;

export { remToPx, pxToRem, responsiveFontSizes };
