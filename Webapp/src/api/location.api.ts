import { Location } from '../model';
import axiosClient from './config.axios';

// ==============================|| LOCATION AXIOS ||============================== //

const locationApi = {
    getLocation(data: Location): Promise<any> {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${data.lat}&lon=${data.lng}&format=jsonv2`;
        return axiosClient.post(url, data);
    },
};

export default locationApi;
