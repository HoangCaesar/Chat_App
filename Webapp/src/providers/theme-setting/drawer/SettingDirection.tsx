// @mui
import { styled } from '@mui/material/styles';
import { Grid, RadioGroup, CardActionArea } from '@mui/material';

// Project Import
// hooks
import useSettings from '../../../hooks/useSettings';
//
import { Iconify } from '../../../components';
import BoxMask from './BoxMask';

// Style
const BoxStyle = styled(CardActionArea)(({ theme }) => ({
    height: 72,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.disabled,
    border: `solid 1px ${theme.palette.grey[500]}`,
    borderRadius: Number(theme.shape.borderRadius) * 1.25,
}));

// ==============================|| DRAWER: SETTING DIRECTION ||============================== //

const SettingDirection = () => {
    const { themeDirection, onChangeDirection } = useSettings();

    return (
        <RadioGroup name="themeDirection" value={themeDirection} onChange={onChangeDirection}>
            <Grid dir="ltr" container spacing={2.5}>
                {['ltr', 'rtl'].map((direction, index) => {
                    const isSelected = themeDirection === direction;

                    return (
                        <Grid key={direction} item xs={6}>
                            <BoxStyle
                                sx={{
                                    ...(isSelected && {
                                        color: 'primary.main',
                                        boxShadow: (theme: any) => theme.customShadows.z20,
                                    }),
                                }}
                            >
                                <Iconify
                                    icon={
                                        index === 0
                                            ? 'ph:align-left-duotone'
                                            : 'ph:align-right-duotone'
                                    }
                                    sx={{
                                        width: '28',
                                        height: '28',
                                    }}
                                />
                                <BoxMask value={direction} />
                            </BoxStyle>
                        </Grid>
                    );
                })}
            </Grid>
        </RadioGroup>
    );
};

export default SettingDirection;
