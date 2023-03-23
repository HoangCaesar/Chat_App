// Project Import
import { Location } from '../model';

// ==============================|| UTILS: SET SIDE NAV DATA ||============================== //

const setSideNavData = (servers: any) => {
    return [
        {
            color: 'blue',
            y: 32,
            title: 'Dashboard',
        },
        {
            color: 'red',
            y: 102,
            title: servers[0]?.name,
        },
        {
            color: 'green',
            y: 172,
            title: servers[1]?.name,
        },
        {
            color: 'purple',
            y: 242,
            title: servers[2]?.name,
        },
    ];
};

export default setSideNavData;
