import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project import
import { DEFAULT_PATH } from '../../config/config';
import Logo from './Logo';

// ==============================|| COMPONENT LOGO ||============================== //

const LogoSection = ({ sx, to }: { sx?: object; to?: string }) => (
    <ButtonBase disableRipple component={Link} to={!to ? DEFAULT_PATH : to} sx={sx}>
        <Logo />
    </ButtonBase>
);

LogoSection.propTypes = {
    sx: PropTypes.object,
    to: PropTypes.string,
};

export default LogoSection;
