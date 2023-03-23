// Project Import
import { Location } from '../model';
import locationApi from '../api/location.api';

// ==============================|| UTILS: GET LOCATION BY LAT&LNG ||============================== //

const getLocationName = async ({ lat, lng }: Location) => {
    return locationApi.getLocation({ lat, lng }).then((response) => {
        const address = response.address;
        const city =
            address.city ||
            address.county ||
            address.village ||
            address.hamlet ||
            address.suburb ||
            address.neighbourhood;

        return city;
    });
};

export default getLocationName;
