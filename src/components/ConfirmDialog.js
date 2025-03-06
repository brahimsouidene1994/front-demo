import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmDialog({ open, handleCloseDialog }) {

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="sm"
            fullWidth={true}
            slotProps={{
                paper: {
                    sx: { position: "absolute", top: 6, margin: 0 },
                }
            }}
        >
            <DialogTitle id="alert-dialog-title" fontSize={22}>
                Confirm Dialog
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" fontSize={16}>
                    Are you sure about deleting this book ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button fontSize={18} onClick={() => handleCloseDialog(false)}>Disagree</Button>
                <Button fontSize={18} onClick={() => handleCloseDialog(true)} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
}