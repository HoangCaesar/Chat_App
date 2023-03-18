// @mui
import { styled } from '@mui/material/styles';
import { Grid, RadioGroup, CardActionArea } from '@mui/material';

// Project Import
// hooks
import useSettings from '../../../hooks/useSettings';
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

// ==============================|| DRAWER: SETTING MODE||============================== //
const SettingMode = () => {
    const { themeMode, onChangeMode } = useSettings();

    return (
        <RadioGroup name="themeMode" value={themeMode} onChange={onChangeMode}>
            <Grid dir="ltr" container spacing={2.5}>
                {['light', 'dark'].map((mode, index) => {
                    const isSelected = themeMode === mode;

                    return (
                        <Grid key={mode} item xs={6}>
                            <BoxStyle
                                sx={{
                                    bgcolor: mode === 'light' ? 'common.white' : 'grey.800',
                                    ...(isSelected && {
                                        color: 'primary.main',
                                        boxShadow: (theme: any) => theme.customShadows.z20,
                                    }),
                                }}
                            >
                                <Iconify
                                    icon={index === 0 ? 'ph:sun-duotone' : 'ph:moon-duotone'}
                                    sx={{
                                        width: '28',
                                        height: '28',
                                    }}
                                />
                                <BoxMask value={mode} />
                            </BoxStyle>
                        </Grid>
                    );
                })}
            </Grid>
        </RadioGroup>
    );
};

export default SettingMode;