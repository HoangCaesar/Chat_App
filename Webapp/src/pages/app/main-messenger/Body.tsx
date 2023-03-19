import { Box } from '@mui/material';

// Project Import
import { Chat_History } from '../../../data/chat_data';

// ==============================|| MESSENGER: BODY ||============================== //

const Body = () => {
    return (
        <Box p={3}>
            {Chat_History.map((item) => {
                switch (item.type) {
                    case 'divider':
                        return <>Timeline</>;

                    case 'msg':
                        switch (item.subtype) {
                            case 'img':
                                return <>Media Message</>;

                            case 'doc':
                                return <>Doc Message</>;
                            case 'Link':
                                return <>Link Message</>;

                            case 'reply':
                                return <>Reply Message</>;

                            default:
                                return <>Text Message</>;
                        }

                    default:
                        return <></>;
                }
            })}
        </Box>
    );
};

export default Body;
