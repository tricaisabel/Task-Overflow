import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack } from '@mui/material';


export default function JoinProject(props) {
  return (
    <Dialog open={props.open} onClose={(e)=>props.setOpen(false)} fullWidth maxWidth='sm'>
    <DialogTitle>Add a new project</DialogTitle>
    <DialogContent>
        <DialogContentText>

        </DialogContentText>
        <Stack spacing={1} sx={{mt:3}}>
            <TextField label="Project name" variant="outlined" required autoFocus/>
            <TextField label="Project Password" variant="outlined" required type="password"/>
        </Stack>
        
    </DialogContent>
    <DialogActions>
        <Button onClick={(e)=>props.setOpen(false)}>Cancel</Button>
        <Button onClick={props.setOpen(true)} variant="contained" size="large">Submit</Button>
    </DialogActions>
    </Dialog>
    
  );
}
