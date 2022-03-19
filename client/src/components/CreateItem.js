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
import Autocomplete from '@mui/material/Autocomplete';

export default function CreateProject(props) {
    
    const project=useSelector((state)=>state.project);
    const user=useSelector((state)=>state.user);
    const [dependencies, setDependencies]=React.useState([]);
    const [duration,setDuration]=React.useState("");
    const [assign,setAssign]=React.useState("");
    const [type,setType]=React.useState("task");
    const [name,setName]=React.useState("");
    const [desc,setDesc]=React.useState("");
    let items=[];

    async function getItems(){
        const body= { "projectId":project["_id"]};
        const response = await fetch(`http://localhost:3001/api/existItems`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if (response.status === 200) {
            const data=await response.json();
            data.map((item)=>items.push(item.name+"-"+item.description.slice(0,100)+"..."));
        }
    }

    getItems(); 

    async function addProject(){
        const newProject={
            name:name,
            description:desc,
            type:type,
            assignedTo:assign || "",
            openedBy:user.firstName+" "+user.lastName,
            progress:0,
            dependencies:dependencies,
            timing:{
                EST:0,
                LST:0,
                EFT:0,
                LFT:0,
                duration:parseInt(duration)
            },
            projectId:project["_id"]
        };
        console.log(newProject);
        const response = await fetch(`http://localhost:3001/api/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProject)
        });
        if (response.status === 200) {
            document.location.reload();
            props.setCreate(false);
            alert("The new item was successfully added");
        }
        else{
            alert("Unfortunately something went wrong. Try again.");
        }
    }

    function handleSubmit(){
        addProject();
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
            <TextField 
                label="Item Duration (days)" 
                variant="outlined" 
                required 
                onChange={(e) =>setDuration(e.target.value)}/>
            
            <DialogTitle>Assign the item (optional)</DialogTitle>
            <DialogContentText>
                This is the person that will have to complete the work item. You can leave this unassigned and assign it later, or you can assign it right now.
            </DialogContentText>
            <Autocomplete
                    onChange={(e,v) =>setAssign(v)}
                    id="tags-outlined"
                    options={project.team}
                    getOptionLabel={(member) => member}
                    defaultValue={project.team[0]}
                    filterSelectedOptions
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Assign"
                        placeholder="Select the person you want to assign"
                    />
                    )}
                />

            <DialogTitle>Add dependencies (optional)</DialogTitle>
            <DialogContentText>
                Select other work items that need to be done in order for this new item to start. Example: the task to wash fruits is dependent on the task to buy fruits from the market in the first place.
            </DialogContentText>
            <Autocomplete
                    onChange={(e,v) =>setDependencies(v)}
                    multiple
                    id="tags-outlined"
                    options={items}
                    getOptionLabel={(item) => item}
                    defaultValue={items[0]}
                    filterSelectedOptions
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Dependent items"
                        placeholder="Select the items you depend on"
                    />
                    )}
                />
        </Stack>
        
    </DialogContent>
    <DialogActions>
        <Button onClick={(e)=>props.setCreate(false)}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" size="large">Submit</Button>
    </DialogActions>
    </Dialog>
    
  );
}
