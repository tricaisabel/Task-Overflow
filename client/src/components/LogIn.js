import TabPanel from '@mui/lab/TabPanel';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Link } from '@mui/material';
import { Typography } from '@mui/material';
import TaskAlt from '@mui/icons-material/TaskAlt';

export default function LogIn(){
    return(
        <TabPanel value="1">
            <Stack spacing={2}>
                <Stack alignItems="center" spacing={2} sx={{mb:3}}>
                    <TaskAlt color="primary" sx={{ fontSize: 60}} />
                    <Typography variant="h5" sx={{ my: 5}}>Log In</Typography>
                </Stack>
                <TextField label="Username" variant="outlined" required/>
                <TextField label="Password" variant="outlined" required type="password"/>
                <Link href="#" variant="body">You don't have an account?</Link>
                <Button variant="contained">LOG IN</Button>
            </Stack>
        </TabPanel>
    )
}