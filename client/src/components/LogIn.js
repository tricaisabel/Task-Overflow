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
    const login=useSelector((state)=>state.login);
    const dispatch=useDispatch();
    const {updateLoginUsername,updateLoginPassword}=bindActionCreators(actionCreators,dispatch);

    return(
        <TabPanel value="1">
            <Stack spacing={2}>
                <Stack alignItems="center" spacing={2} sx={{mb:3}}>
                    <TaskAlt color="primary" sx={{ fontSize: 60}} />
                    <Typography variant="h5" sx={{ my: 5}}>Log In</Typography>
                </Stack>
                <TextField label="Username" variant="outlined" required onChange={(e)=>updateLoginUsername(e.target.value)}/>
                <TextField label="Password" variant="outlined" required type="password" onChange={(e)=>updateLoginPassword(e.target.value)}/>
                <Button variant="contained" onClick={(e)=>alert(login.username+" "+login.password)}>LOG IN</Button>
            </Stack>
        </TabPanel>
    )
}