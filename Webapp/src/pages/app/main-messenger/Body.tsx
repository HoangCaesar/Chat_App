import { Box } from '@mui/material';

// Project Import
import { Chat_History } from '../../../data/chat_data';
import { Timeline, DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg } from '../../../sections';

// ==============================|| MESSENGER: BODY ||============================== //

const Body = ({ menu }: any) => {
    return (
        <Box width="100%" sx={{ flexGrow: 1, height: '100%', overflowY: 'scroll' }}>
            <Box p={3}>
                {Chat_History.map((item) => {
                    switch (item.type) {
                        case 'divider':
                            return (
                                // Timeline
                                <Timeline key={item.message} el={item} />
                            );

                        case 'msg':
                            switch (item.subtype) {
                                case 'img':
                                    return (
                                        // Media Message
                                        <MediaMsg key={item.message} el={item} menu={menu} />
                                    );

                                case 'doc':
                                    return (
                                        // Doc Message
                                        <DocMsg key={item.message} el={item} menu={menu} />
                                    );
                                case 'Link':
                                    return (
                                        //  Link Message
                                        <LinkMsg key={item.message} el={item} menu={menu} />
                                    );

                                case 'reply':
                                    return (
                                        //  ReplyMessage
                                        <ReplyMsg key={item.message} el={item} menu={menu} />
                                    );

                                default:
                                    return (
                                        // Text Message
                                        <TextMsg key={item.message} el={item} menu={menu} />
                                    );
                            }

                        default:
                            return <></>;
                    }
                })}
            </Box>
        </Box>
    );
};

export default Body;
