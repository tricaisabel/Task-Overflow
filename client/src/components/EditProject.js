import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import enLocale from 'date-fns/locale/en-US';
import {useSelector} from 'react-redux';
import MembersAuto from './MembersAuto';

export default function EditProject(props) {
    let user=useSelector((state)=>state.user);
    const [team, setTeam]=React.useState([]);
    const [date,setDate]=React.useState("");
    const [project, setProject] = React.useState({
        name:props.edit.name,
        description:props.edit.description,
        password:props.edit.password,
        password2:props.edit.password,
        deadline:props.edit.deadline,
        progress:props.edit.progress,
        manager:{
            name:user.firstName+" "+user.lastName,
            color:user.color,
            job:user.job
        }
    });

    const handleClose = () => {
        props.setEdit("")
    };

    function changeState(field,value){
        let newState={...project};
        newState[field]=value;
        setProject(newState);
    }

    const handleDate = (newDate) => {
        let ISODate=newDate.toISOString();
        ISODate=ISODate.slice(0,ISODate.indexOf("T"))
        setDate(newDate);
        changeState("deadline",ISODate);
    };

    function convertDate(){
        let year=props.edit.deadline.slice(0,4);
        let month=props.edit.deadline.slice(5,7);
        let day=props.edit.deadline.slice(8,10);
        setDate(month+"/"+day+"/"+year);
    }

    async function saveProject(){
        if(project.password===project.password2)
        {
            delete project.password2;
            project["team"]=team;
            const response = await fetch(`http://localhost:3001/api/project/${props.edit["_id"]}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
            });
            if (response.status === 200) {
                document.location.reload();
                props.setCreate(false);
                alert("saved");
            }
            else{
                alert("not saved");
            }
        }
        else{
            alert("passwords not equal");
        }
    }

    React.useEffect(()=>{
        convertDate() 
    },[]);
    

    function handleSubmit(){
        saveProject();
        props.setEdit("");
    }

  return (
    <div>
      <Dialog open={props.edit!==""} onClose={handleClose} fullWidth maxWidth='md'>
        <DialogTitle>Edit Project - {props.edit.name}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{mt:3}}>
            <TextField 
                label="Project name" 
                variant="outlined" 
                required 
                autoFocus
                defaultValue={props.edit.name}
                onChange={(e) =>changeState("name",e.target.value)}/>
            <TextField 
                label="New Password" 
                variant="outlined" 
                required 
                type="password"
                defaultValue={props.edit.password}
                onChange={(e) =>changeState("password",e.target.value)}/>
            <TextField 
                label="Repeat Password" 
                variant="outlined" 
                required 
                type="password"
                defaultValue={props.edit.password}
                onChange={(e) =>changeState("password2",e.target.value)}/>
            <TextField 
                label="Enter a suggestive description for your new project" 
                variant="outlined" 
                required 
                multiline 
                rows={4}
                defaultValue={props.edit.description}
                onChange={(e) =>changeState("description",e.target.value)}/>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
                 <DatePicker
                    label="Project deadline"
                    mask={'__/__/____'}
                    value={date}
                    onChange={handleDate}
                    renderInput={(params) => <TextField {...params} />}
                    />
            </LocalizationProvider>
            <MembersAuto setValue={setTeam} multiple={true}/>
        </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e)=>props.setEdit("")}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" size="large">Save changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
