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
        ...servers.map((server: any, index: number) => {
            return {
                color: 'green',
                y: 102 + index*70,
                title: server.name,
                path: `/server/${server._id}`,
                id: server._id,
            };
        }),
    ];
};

export default setSideNavData;
