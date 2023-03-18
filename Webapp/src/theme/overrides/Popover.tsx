// ==============================|| OVERRIDE: POPOVER ||============================== //

const Popover = (theme: any) => {
    return {
        MuiPopover: {
            styleOverrides: {
                paper: {
                    boxShadow: theme.customShadows.dropdown,
                    borderRadius: Number(theme.shape.borderRadius) * 1.5,
                },
            },
        },
    };
};
export default Popover;
