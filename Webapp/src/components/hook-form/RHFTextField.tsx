import PropTypes from 'prop-types';
// form
import { useController } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';
import { InputHTMLAttributes } from 'react';

// ==============================|| COMPONENT: RHF TEXT FIELD ||============================== //

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
  };

const RHFTextField = ({ name, label, ...InputProps }: InputFieldProps) => {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error }
      } = useController({
        name,
      })
    
      return (
        <TextField
          fullWidth
          size="small"
          margin="normal"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          label={label}
          variant="outlined"
          inputRef={ref}
          error={invalid}
          helperText={error?.message}
          InputProps={InputProps as any}
        />
      )
};

RHFTextField.propTypes = {
    name: PropTypes.string,
    helperText: PropTypes.node,
};

export default RHFTextField;
