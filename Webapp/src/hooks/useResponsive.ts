import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// ==============================|| HOOKS: useResponsive ||============================== //

const useResponsive = (query?: string, key?: string | number, start?: string, end?: string) => {
    const theme = useTheme();

    const mediaUp = useMediaQuery(theme.breakpoints.up(key as any));

    const mediaDown = useMediaQuery(theme.breakpoints.down(key as any));

    const mediaBetween = useMediaQuery(theme.breakpoints.between(start as any, end as any));

    const mediaOnly = useMediaQuery(theme.breakpoints.only(key as any));

    if (query === 'up') {
        return mediaUp;
    }

    if (query === 'down') {
        return mediaDown;
    }

    if (query === 'between') {
        return mediaBetween;
    }

    if (query === 'only') {
        return mediaOnly;
    }
    return null;
};

export default useResponsive;
