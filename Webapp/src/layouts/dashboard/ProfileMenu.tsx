import { Avatar, Box, Fade, Menu, MenuItem, Stack } from '@mui/material';
import { useState, useEffect } from 'react';

import { faker } from '@faker-js/faker';

// Project Import
import { Profile_Menu } from '../../data/chat_data';
import { useAppDispatch, useAppSelector } from '../../hooks/sagaHooks';
import { authActions } from '../../store/reducers/auth/auth.slice';
import { userSelectUser, userActions } from '../../store/reducers/user/user.slice';

// ==============================|| DASHBOARD LAYOUT: PROFILE MENU ||============================== //

const ProfileMenu = () => {
    const dispatch = useAppDispatch();

    const userInfo = useAppSelector(userSelectUser);
    // console.log(userInfo);

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        dispatch(userActions.getUser());
    }, []);

    return (
        <>
            <Avatar
                id="profile-positioned-button"
                aria-controls={openMenu ? 'profile-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? 'true' : undefined}
                alt={faker.name.fullName()}
                src={faker.image.avatar()}
                onClick={handleClick}
            />
            <Menu
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                TransitionComponent={Fade}
                id="profile-positioned-menu"
                aria-labelledby="profile-positioned-button"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box p={1}>
                    <Stack spacing={1}>
                        {Profile_Menu.map((el, idx) => (
                            <MenuItem onClick={handleClose} key={el.title}>
                                <Stack
                                    onClick={() => {
                                        if (idx === 2) {
                                            dispatch(authActions.SignoutUser());
                                        }
                                    }}
                                    sx={{ width: 100 }}
                                    direction="row"
                                    alignItems={'center'}
                                    justifyContent="space-between"
                                >
                                    <span>{el.title}</span>
                                    {el.icon}
                                </Stack>{' '}
                            </MenuItem>
                        ))}
                    </Stack>
                </Box>
            </Menu>
        </>
    );
};

export default ProfileMenu;
