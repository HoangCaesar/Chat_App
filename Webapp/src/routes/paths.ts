// ==============================|| PATH GENERATE  ||============================== //
const ROOTS_DASHBOARD = '/';

function path(root: string, sublink: string) {
    return `${root}${sublink}`;
}

const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    general: {
        app: path(ROOTS_DASHBOARD, 'app'),
    },
};

export { PATH_DASHBOARD };

