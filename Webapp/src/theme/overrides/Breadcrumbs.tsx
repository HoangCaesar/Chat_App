// ==============================|| OVERRIDE: BREADCRUMS ||============================== //

const Breadcrumbs = (theme: any) => {
    return {
        MuiBreadcrumbs: {
            styleOverrides: {
                separator: {
                    marginLeft: theme.spacing(2),
                    marginRight: theme.spacing(2),
                },
            },
        },
    };
};
export default Breadcrumbs;
