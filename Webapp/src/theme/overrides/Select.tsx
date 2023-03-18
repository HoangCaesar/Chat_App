import { InputSelectIcon } from './CustomIcons';

// ==============================|| OVERRIDE: SELECT ||============================== //

const Select = () => {
    return {
        MuiSelect: {
            defaultProps: {
                IconComponent: InputSelectIcon,
            },
        },
    };
};

export default Select;
