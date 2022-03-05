import TabPanel from '@mui/lab/TabPanel';
import { TextField, Typography,Button,MenuItem,Select,InputLabel ,FormControl,Stack} from '@mui/material';
import Security from '@mui/icons-material/Security';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import * as React from 'react';

export default function SignIn(){
    const Input = styled('input')({
    display: 'none',
    });

    const [role, setRole] = React.useState('');
    const [picture,setPicture]=React.useState('No picture uploaded');

    return(
        <TabPanel value="2">
            <Stack alignItems="center" spacing={2}>
                <Security color="primary" sx={{ fontSize: 60}} />
                <Typography variant="h5"  sx={{ m: 5}} >Create an account</Typography>
            </Stack>
            <Box sx={{ flexWrap: 'wrap', mt:3}}>

                <TextField label="Username" variant="outlined" required sx={{m:1}}/>
                <TextField label="GitHub username" variant="outlined" sx={{m:1}}/>
                <TextField label="First name" variant="outlined" required sx={{m:1}}/>
                <TextField label="Last name" variant="outlined" required sx={{m:1}}/>
                <TextField label="Password" variant="outlined" required type="password" sx={{m:1}}/>
                <TextField label="Repeat password" variant="outlined" required sx={{m:1}}/>
                <TextField label="Job title" variant="outlined" required sx={{m:1}}/>

                <FormControl sx={{ m: 1, minWidth: 120 }} required>
                    <InputLabel>Role</InputLabel>
                    <Select
                    value={role}
                    label="Age"
                    onChange={(event)=>setRole(event.target.value)}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                        <MenuItem value={10}>Manager</MenuItem>
                        <MenuItem value={20}>Member</MenuItem>
                    </Select>
                </FormControl>

                <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" type="file" onChange={(event)=>setPicture(event.target.value.slice(12))}/>
                    <Button variant="contained" component="span">
                        Upload profile picture
                    </Button>
                </label>

                <Typography variant="body2"  sx={{ ml:1, display:"inline"}} >{picture}</Typography>
            </Box>

            <Stack spacing={2} sx={{mt:3}}>
                <Button variant="contained">REGISTER</Button>
            </Stack>
        </TabPanel>
    )
}