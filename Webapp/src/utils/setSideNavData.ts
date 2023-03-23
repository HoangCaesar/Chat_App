// Project Import
import { Location } from '../model';

// ==============================|| UTILS: SET SIDE NAV DATA ||============================== //

const setSideNavData = (servers: any) => {
    return [
        {
            color: 'blue',
            y: 32,
            title: 'Dashboard',
            path: '/app',
        },
        {
            color: 'red',
            y: 102,
            title: servers[0]?.name,
            path: `/server/${servers[0]?._id}`,
        },
        {
            color: 'green',
            y: 172,
            title: servers[1]?.name,
            path: `/server/${servers[1]?._id}`,
        },
        {
            color: 'purple',
            y: 242,
            title: servers[2]?.name,
            path: `/server/${servers[2]?._id}`,
        },
    ];
};

export default setSideNavData;
