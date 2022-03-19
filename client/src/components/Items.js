import { Button, Stack, Typography } from "@mui/material";
import Add from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import {useState} from 'react';
import CreateItem from './CreateItem';
import ItemList from './ItemList';

export default function Items(){
    const [tab, setTab] = useState('1');
    const [open,setOpen]=useState(false);
    return(
        <>
        <Stack spacing={2} sx={{mr:5}}>
        <Typography variant="h4">Item Center</Typography>
        <Typography variant="body">Items are pieces of work that need to be done. Items can be assigned to whomever you want from the profect team (including yourself). 
        <br/>Everyone can add a new item so that team the is aware of the state of the project.</Typography>
        </Stack>
        <Button 
            variant="contained" 
            size="medium" 
            startIcon={<Add />} 
            sx={{my:2,}}
            onClick={()=>setOpen(true)}>
            Add a new item
        </Button>
        <Container maxWidth="100%" sx={{mx:"-24px"}}>
        <Card variant="outlined">
            <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={(e,newTab)=>setTab(newTab)} aria-label="lab API tabs example">
                <Tab label="List View" value="1" />
                <Tab label="Kanban" value="2" />
                </TabList>
            </Box>
            <TabPanel value="1">
                <ItemList/>
            </TabPanel>
            <TabPanel value="2">
               Kanban
            </TabPanel>
            </TabContext>
            {open && <CreateItem create={open} setCreate={setOpen}/>}
        </Card>
        </Container>
        </>
    );
}