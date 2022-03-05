import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';


export default function CreateProject(props) {
    const [date, setDate] = React.useState(null);

    return (
    <Dialog open={props.create} onClose={(e)=>props.setCreate(false)} fullWidth maxWidth='sm'>
    <DialogTitle>Create a new project</DialogTitle>
    <DialogContent>
        <DialogContentText>
            New members will try to join using the project's name and password. You can share this data with whom you want to join your project
        </DialogContentText>
        <Stack spacing={2} sx={{mt:3}}>
            <TextField label="Project name" variant="outlined" required autoFocus/>
            <TextField label="Project Password" variant="outlined" required type="password"/>
            <TextField label="Repeat Password" variant="outlined" required type="password"/>
            <TextField label="Enter a suggestive description for your new project" variant="outlined" required multiline rows={4}/>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Project deadline"
                    value={date}
                    onChange={(newValue) => {
                    setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </Stack>
        
    </DialogContent>
    <DialogActions>
        <Button onClick={(e)=>props.setCreate(false)}>Cancel</Button>
        <Button onClick={props.setCreate(true)} variant="contained" size="large">Submit</Button>
    </DialogActions>
    </Dialog>
    
  );
}
