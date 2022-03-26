import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import {useSelector} from 'react-redux';
import { Stack } from '@mui/material';
import TaskAlt from '@mui/icons-material/TaskAlt';
import BugReport from '@mui/icons-material/BugReport';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import { Button } from '@mui/material';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../state/actionCreators';

export default function AlignItemsList(props) {
    const items=useSelector((state)=>state.items);
    const user=useSelector((state)=>state.user);
    const dispatch=useDispatch();
    const {addItems}=bindActionCreators(actionCreators,dispatch);
    const cards=[
        {bg:'text.disabled',text:'To Do',value:0},
        {bg:'#42a5f5',text:'In Progress',value:50},
        {bg:'#1976d2',text:'Done',min:60,value:100}
    ];

    async function moveItem(direction,item){
        let body={...item};
        const sign=direction==="right"?1:-1;
        body.progress=item.progress+sign*50;
        const response = await fetch(`http://localhost:3001/api/item/${item["_id"]}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
        });
        if (response.status === 200) {
            props.getItems();
        }
    }
    
  return (
    <Stack
    direction="row"
    justifyContent="center"
    alignItems="flex-start"
    spacing={2}>
        {
        cards.map((card,i)=>
        <Stack width="0.33" key={i}>
            <Typography variant="h6" sx={{ fontWeight: 'regular', bgcolor: card.bg, color:'white',borderRadius: 2,textAlign: 'center'}}>{card.text}</Typography>
            <List sx={{ 
                bgcolor: 'background.paper', 
                overflow: 'auto',
                maxHeight: 300,
                '& ul': { padding: 0 },}}>
            {
            items.map((item,j)=>
            item.progress===card.value &&
            <div key={j}>
                <ListItemButton alignItems="flex-start" disabled={item.assignedTo!==user.firstName+" "+user.lastName}>
                    <ListItemAvatar>
                        {
                            {
                                "task":<TaskAlt sx={{ color: card.bg}} variant="rounded"/>,
                                "bug":<BugReport sx={{ color: card.bg}} variant="rounded"/>,
                                "issue":<ErrorOutline sx={{ color: card.bg}} variant="rounded"/>
                            }[item.type] 
                        }
                    </ListItemAvatar>
                    <Stack direction="column"  width="100%">
                        <ListItemText
                        primary={item.name}
                        secondary={
                            <React.Fragment>
                            {item.description.slice(0,100)+"..."}
                            </React.Fragment>
                        }
                        />
                        <Typography variant="caption"> Opened by: {item.openedBy}</Typography>
                        <Typography variant="caption"> Assigned to: {item.assignedTo===user.firstName+" "+user.lastName? "You":item.assignedTo}</Typography>
                    </Stack>
                    <Stack>
                    {    
                        i!==2 &&
                        <Button
                            sx={{ my: 0.5 }}
                            variant="outlined"
                            size="small"
                            onClick={(e)=>moveItem("right",item)}
                            aria-label="move selected right"
                        >
                            &gt;
                        </Button>
                    }
                    {
                        i!==0 &&
                        <Button
                            sx={{ my: 0.5 }}
                            variant="outlined"
                            size="small"
                            onClick={(e)=>moveItem("left",item)}
                            aria-label="move selected left"
                        >
                            &lt;
                        </Button>
                    }
                    </Stack>
                </ListItemButton>
            </div>
            )}
            {
                items.length===0 && 
                <Typography variant="body2">Currently, there are no items</Typography>
            }
            </List>
        </Stack>
        )}
    </Stack>    
  );
}
