import PropTypes from 'prop-types';
// @mui
import { Radio, FormControlLabel } from '@mui/material';

// ==============================|| DRAWER: BOX MASK ||============================== //

const BoxMask = ({ value }: any) => {
    return (
        <FormControlLabel
            label=""
            value={value}
            control={<Radio sx={{ display: 'none' }} />}
            sx={{
                m: 0,
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                position: 'absolute',
            }}
        />
    );
};

BoxMask.propTypes = {
    value: PropTypes.string,
};

export default BoxMask;
