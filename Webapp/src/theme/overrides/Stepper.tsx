// ==============================|| OVERRIDE: STEPPER ||============================== //

const Stepper = (theme: any) => {
    return {
        MuiStepConnector: {
            styleOverrides: {
                line: {
                    borderColor: theme.palette.divider,
                },
            },
        },
    };
};

export default Stepper;
