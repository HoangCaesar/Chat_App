// ==============================|| UTILS: CUT STRING ||============================== //

const cutTimeString = (timeString?: string) => {
    const dateList = timeString?.split('T')[0].split('-');
    const date = `${dateList?.[2]}/${dateList?.[1]}/${dateList?.[0]}`;

    const hourList = timeString?.split('T')?.[1].split(':');
    const hour = `${hourList?.[0]}:${hourList?.[1]}`;

    const day = date.split('-')[2];

    const today = new Date().toString().split(' ')[2];

    if (today === day) {
        return hour;
    } else {
        return date;
    }
};

const cutMessageString = (messageString: any) => {
    if (messageString?.length <= 12) {
        return messageString;
    }

    const newMessageString = messageString?.split('')?.splice(0, 12)?.join('') + '...';
    return newMessageString;
};

export { cutTimeString, cutMessageString };
