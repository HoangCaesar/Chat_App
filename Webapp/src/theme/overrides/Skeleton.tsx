// ==============================|| OVERRIDE: SKELETON ||============================== //

const Skeleton = (theme: any) => {
    return {
        MuiSkeleton: {
            defaultProps: {
                animation: 'wave',
            },

            styleOverrides: {
                root: {
                    backgroundColor: theme.palette.background.neutral,
                },
            },
        },
    };
};

export default Skeleton;
