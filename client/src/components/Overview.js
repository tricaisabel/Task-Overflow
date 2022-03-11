import NavBar from './Navbar'
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import ListAlt from '@mui/icons-material/ListAlt';
import { Stack } from '@mui/material';
import Table from './Table';
import { Button } from '@mui/material';
import JoinProject from './JoinProject';
import CreateProject from './CreateProject';
import * as React from 'react';
import Add from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/Edit';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';

export default function Overview(){
    const [open, setOpen] = React.useState(false);
    const [create, setCreate] = React.useState(false);
    let user=useSelector((state)=>state.user);
    const isMember=user.role==="member"? true : false;
    console.log(isMember);
    console.log(user.role)

    async function getProjects(){
        const response = await fetch(`http://localhost:3001/api/projects`);
        if(response.status===200){
            const data=await response.json();
            //get projects that the user participates in
        }
    }
    useEffect(()=>{
        //get project
        //send to store
        
    },[]);

    return(
        <>
        <NavBar/>
        <Box sx={{ bgcolor: grey[300], width:1, p:0, display:'flex', flexDirection:'column', justifyContent: 'center', height:'91vh' }} >
            <Container maxWidth="xl">
                <Card variant="outlined">
                    <Stack justifyContent='center' flexDirection='row' alignItems='center' sx={{m:3}}>
                        <ListAlt color="primary" sx={{ fontSize: 30}}/>
                        <Typography variant="h5" sx={{fontWeight: 'medium',m:2, display:'inline'}}>Here are your projects, {user.firstName}</Typography>
                    </Stack>
                    <Table/>
                   {
                    user.role==="member" && <Button variant="contained" size="large" sx={{m:3}} startIcon={<Add />} onClick={(e)=>setOpen(true)}>Join new project</Button>
                   }
                   {
                    user.role==="manager" && <Button variant="contained" size="large" sx={{m:3}} startIcon={<Edit />} onClick={(e)=>setCreate(true)}>Create new project</Button>
                    }
                    {open && <JoinProject open={open} setOpen={setOpen}/>  }                   
                    {create && <CreateProject create={create} setCreate={setCreate}/> }                   
                </Card>
            </Container>
        </Box>
        </>
    )
}