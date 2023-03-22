import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Project import
import { BASE_URL } from './constants.axios';

// helpers
const getToken = () => {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken;
};

// ==============================|| MAIN AXIOS - CONFIG AXIOS ||============================== //

const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use((config: AxiosRequestConfig | any) => {
    return {
        ...config,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
    };
});

axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    (error) => {
        if (error && error.response.data) {
            return error.response.data;
        }

        return error;
    }
);

export default axiosClient;
