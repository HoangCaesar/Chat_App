import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Slide,
} from '@mui/material';
import { forwardRef } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
    return (
        <Slide direction="up" ref={ref} {...props}>
            <></>
        </Slide>
    );
});

const ThemeDialog = ({ open, handleClose }: any) => {
    return (
        <>
            <Dialog
                fullWidth
                open={open}
                TransitionComponent={Transition as any}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ mb: 2 }}>{'Choose Theme'}</DialogTitle>
                <DialogContent>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="light"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="light" control={<Radio />} label="Light" />
                            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
                            <FormControlLabel
                                value="system"
                                control={<Radio />}
                                label="System Default"
                            />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleClose}>
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ThemeDialog;
