import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useSelector} from 'react-redux';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

export default function CreateProject(props) {
    
    const project=useSelector((state)=>state.project);
    const user=useSelector((state)=>state.user);
    const [assign,setAssign]=React.useState("none");
    const [type,setType]=React.useState("task");
    const [name,setName]=React.useState("");
    const [desc,setDesc]=React.useState("");
    const [deadline,setDeadline]=React.useState(new Date());

    async function addItem(){
        const newItem={
            name:name,
            description:desc,
            type:type,
            assignedTo:assign,
            openedBy:user.firstName+" "+user.lastName,
            progress:0,
            deadline:deadline,
            projectId:project["_id"]
        };
        console.log(newItem);
        const response = await fetch(`http://localhost:3001/api/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
        });
        if (response.status === 200) {
            alert("The new item was successfully added");
        }
        else{
            alert("Unfortunately something went wrong. Try again.");
        }
    }

    function handleSubmit(){
        addItem();
        props.getItems();
        props.setCreate(false);
    }

    return (
    <Dialog open={props.create} onClose={(e)=>props.setCreate(false)} fullWidth maxWidth='md'>
    <DialogTitle>Create a work item</DialogTitle>
    <DialogContent>
        <Stack spacing={2} sx={{mt:3}}>
            <DialogTitle>Item Details</DialogTitle>
            <TextField 
                label="Item name" 
                variant="outlined" 
                required 
                autoFocus
                onChange={(e) =>setName(e.target.value)}/>
            <TextField 
                label="Enter a suggestive description for your new item" 
                variant="outlined" 
                required 
                multiline 
                rows={4}
                onChange={(e) =>setDesc(e.target.value)}/>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Item type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Item type"
                    onChange={(e)=>setType(e.target.value)}
                >
                    <MenuItem value={"task"}>Task</MenuItem>
                    <MenuItem value={"issue"}>Issue</MenuItem>
                    <MenuItem value={"bug"}>Bug</MenuItem>
                </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                renderInput={(params) => <TextField {...params} />}
                label="Item deadline"
                value={deadline}
                onChange={(newValue) => {
                    setDeadline(newValue);
                }}
                minDateTime={new Date()}
                />
            </LocalizationProvider>
            
            <DialogTitle>Assign the item (optional)</DialogTitle>
            <DialogContentText>
                This is the person that will have to complete the work item. You can leave this unassigned and assign it later, or you can assign it right now.
            </DialogContentText>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={assign}
                label="Assign item"
                onChange={(e)=>setAssign(e.target.value)}
            >
                {
                    project.team.map((member,index)=>
                    <MenuItem value={member} key={index}>{member}</MenuItem>
                )}
                <MenuItem value={"none"}>None</MenuItem>
            </Select>
        </Stack>
        
    </DialogContent>
    <DialogActions>
        <Button onClick={(e)=>props.setCreate(false)}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" size="large">Submit</Button>
    </DialogActions>
    </Dialog>
    
  );
}
