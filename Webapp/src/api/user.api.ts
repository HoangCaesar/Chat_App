import { GetUserResponse } from '../model';
import axiosClient from './config.axios';

// ==============================|| USER AXIOS ||============================== //

const userApi = {
    getUser(): Promise<GetUserResponse> {
        const url = '/user/get-user';
        return axiosClient.get(url);
    },
};

export default userApi;
