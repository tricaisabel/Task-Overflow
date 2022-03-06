import TabPanel from '@mui/lab/TabPanel';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import TaskAlt from '@mui/icons-material/TaskAlt';
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../state/actionCreators';

export default function LogIn(){
    const user=useSelector((state)=>state.user);
    const dispatch=useDispatch();
    const {updateUserField}=bindActionCreators(actionCreators,dispatch);

    async function authUser(){
        const body= { "username":user.username, "password":user.password };
        const response = await fetch(`http://localhost:3001/api/existUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        
        if (response.status === 200) {
            alert("found");
            updateUserField("logged",true);
        }
        
    }

    return(
        <TabPanel value="1">
            <Stack spacing={2}>
                <Stack alignItems="center" spacing={2} sx={{mb:3}}>
                    <TaskAlt color="primary" sx={{ fontSize: 60}} />
                    <Typography variant="h5" sx={{ my: 5}}>Log In</Typography>
                </Stack>
                <TextField 
                    label="Username" 
                    variant="outlined" 
                    required 
                    onChange={(e)=>updateUserField("username",e.target.value)}/>
                <TextField 
                    label="Password" 
                    variant="outlined" 
                    required type="password" 
                    onChange={(e)=>updateUserField("password",e.target.value)}/>
                <Button 
                    variant="contained" 
                    onClick={authUser}>
                    LOG In
                </Button>
            </Stack>
        </TabPanel>
    )
}