import TabPanel from '@mui/lab/TabPanel';
import { TextField, Typography,Button,MenuItem,Select,InputLabel ,FormControl,Stack} from '@mui/material';
import Security from '@mui/icons-material/Security';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../state/actionCreators';

export default function SignIn(){
    const Input = styled('input')({
    display: 'none',
    });

    const user=useSelector((state)=>state.user);
    const dispatch=useDispatch();
    const {updateUserField}=bindActionCreators(actionCreators,dispatch);

    const [role, setRole] = React.useState('');
    const [picture, setPicture] = React.useState('No picture uploaded');
    const [error, setError] = React.useState(false);
    const [password2, setPassword2] = React.useState("");


    async function addUser(){
        if(user.password!==password2)
            setError(true);
        else{
            updateUserField("color",Math.floor(Math.random()*16777215).toString(16));
            const response = await fetch(`http://localhost:3001/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
            });
            if (response.status === 200) {
                alert("posted");
                updateUserField("logged",true);
            }
            else{
                alert("not posted");
            }
        }
    }

    function handleRole(event){
        updateUserField("role",event.target.value);
        setRole(event.target.value);
    }

    return(
        <TabPanel value="2">
            <Stack alignItems="center" spacing={2}>
                <Security color="primary" sx={{ fontSize: 60}} />
                <Typography variant="h5"  sx={{ m: 5}} >Create an account</Typography>
            </Stack>
            <Box sx={{ flexWrap: 'wrap', mt:3}}>

                <TextField 
                    label="Username" 
                    variant="outlined" 
                    required 
                    sx={{m:1}}
                    onChange={(e)=>updateUserField("username",e.target.value)}/>
                <TextField 
                    label="GitHub username" 
                    variant="outlined" 
                    sx={{m:1}}
                    onChange={(e)=>updateUserField("gitUsername",e.target.value)}/>
                <TextField 
                    label="First name" 
                    variant="outlined" 
                    required 
                    sx={{m:1}}
                    onChange={(e)=>updateUserField("firstName",e.target.value)}/>
                <TextField 
                    label="Last name" 
                    variant="outlined" 
                    required 
                    sx={{m:1}}
                    onChange={(e)=>updateUserField("lastName",e.target.value)}/>
                <TextField 
                    label="Password" 
                    variant="outlined" 
                    required 
                    type="password" 
                    sx={{m:1}}
                    onChange={(e)=>updateUserField("password",e.target.value)}/>
                <TextField 
                    label="Repeat password" 
                    variant="outlined" 
                    required 
                    type="password" 
                    sx={{m:1}}
                    error={error}
                    helperText="Passwords must match"
                    onChange={(e)=>setPassword2(e.target.value)}
                    />
                <TextField 
                    label="Job title" 
                    variant="outlined" 
                    required 
                    sx={{m:1}}
                    onChange={(e)=>updateUserField("job",e.target.value)}/>

                <FormControl sx={{ m: 1, minWidth: 120 }} required>
                    <InputLabel>Role</InputLabel>
                    <Select
                    value={role}
                    label="Role"
                    onChange={(e)=>handleRole(e)}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                        <MenuItem value={"manager"}>Manager</MenuItem>
                        <MenuItem value={"member"}>Member</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Stack spacing={2} sx={{mt:3}}>
                <Button 
                    variant="contained"
                    onClick={addUser}>
                    REGISTER
                </Button>
            </Stack>
        </TabPanel>
    )
}