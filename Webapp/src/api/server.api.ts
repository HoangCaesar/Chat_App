import { Server, ServerResponse } from '../model';
import axiosClient from './config.axios';

// ==============================|| SERVER AXIOS ||============================== //

const serverApi = {
    createServer(data: Server): Promise<any> {
        const url = '/server/create';
        return axiosClient.post(url, data);
    },
    getAllServer(): Promise<ServerResponse> {
        const url = '/server/all';
        return axiosClient.get(url);
    },
};

export default serverApi;
