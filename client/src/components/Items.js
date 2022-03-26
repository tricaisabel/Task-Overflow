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
import Kanban from './Kanban';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../state/actionCreators';
import {useEffect} from 'react';

export default function Items(){
    const [tab, setTab] = useState('1');
    const [open,setOpen]=useState(false);
    let project=useSelector((state)=>state.project);
    const dispatch=useDispatch();
    const {addItems}=bindActionCreators(actionCreators,dispatch);

    useEffect(()=>{
        getItems();
    },[]);

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
            let rows=data;
            rows.forEach((item)=>{
                delete item["__v"];
                delete item.timing;
                delete item.projectId;
                delete item.dependencies;
            })  
            addItems(rows);    
      }
    }

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
            <TabPanel value="1" sx={{p:1}}>
                <ItemList getItems={getItems}/>
            </TabPanel>
            <TabPanel value="2" sx={{p:1}}>
               <Kanban getItems={getItems}/>
            </TabPanel>
            </TabContext>
            {open && <CreateItem create={open} setCreate={setOpen} getItems={getItems}/>}
        </Card>
        </Container>
        </>
    );
}