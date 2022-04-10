import PieChart from "./PieChart";
import {useSelector} from 'react-redux';
import { Stack } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from "react";
import BarChart from "./BarChart";

export default function AnalyticItems(props){
    const items=useSelector((state)=>state.items);
    const [option,setOption]=useState("Items by type");
    function getCountsByType(){
        let countsByType=[
            {type:"Tasks",count:0},
            {type:"Bugs",count:0},
            {type:"Issues",count:0}
        ];
        items.map(item=>{
            let element=countsByType.find(element=>element.type.toLowerCase()===item.type+"s");
            element.count++;
        });
        return countsByType;
    }
    
    function daysDifference(item) {
        const time_diff = new Date(item.deadline).getTime() - new Date().getTime();
        const days_diff = time_diff / (1000 * 3600 * 24);
        return Math.round(days_diff);
    }

    function getCountByDeadline(){
        let countsByDeadline=[
            {type:"Must be done in more than 3 days",count:0},
            {type:"Must be done in less than 3 days",count:0},
            {type:"Overdue Item",count:0}
        ];
        items.map(item=>{
            const difference=daysDifference(item);
            if(difference>3)
                countsByDeadline[0].count++;
            else if (difference<=3 && difference>0)
                countsByDeadline[1].count++;
            else if(difference<=0)
                countsByDeadline[2].count++;
        });
        return countsByDeadline;
    }

    function getAssignation(){
        let result=[];
        let members=[];
        items.forEach(item=>{
            if(!members.includes(item.assignedTo)){
                members.push(item.assignedTo);
                let assign={group:item.assignedTo,task:0,bug:0,issue:0};
                assign[item.type]=1;
                result.push(assign);
            }
            else{
                result.forEach(a=>{
                    if(a.group===item.assignedTo)
                        a[item.type]++;
                })
            }
        });
        result.forEach(a=>{
            a.task=a.task.toString();
            a.issue=a.issue.toString();
            a.bug=a.bug.toString();
        })
        return result;
    }

    function getCreated(){
        let result=[];
        let members=[];
        items.forEach(item=>{
            if(!members.includes(item.openedBy)){
                members.push(item.openedBy);
                let open={group:item.openedBy,task:0,bug:0,issue:0};
                open[item.type]=1;
                result.push(open);
            }
            else{
                result.forEach(a=>{
                    if(a.group===item.assignedTo)
                        a[item.type]++;
                })
            }
        });
        result.forEach(a=>{
            a.task=a.task.toString();
            a.issue=a.issue.toString();
            a.bug=a.bug.toString();
        })
        return result;
    }

    return(
        <Stack spacing={2}>
        <FormControl style={{maxWidth:"300px"}}>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={option}
            label="Chart Type"
            onChange={(event)=>setOption(event.target.value)}
            >
                <MenuItem value={"Items by type"}>Items by type</MenuItem>
                <MenuItem value={"Items by deadline"}>Items by deadline</MenuItem>
                <MenuItem value={"Items assigned for each member"}>Items assigned for each member</MenuItem>
                <MenuItem value={"Items opened by each member"}>Items opened by each member</MenuItem>
            </Select>
        </FormControl>
        {
            {
                "Items by type":<PieChart data={getCountsByType()} colorScheme={props.colorScheme} title={option}/>,
                "Items by deadline":<PieChart data={getCountByDeadline()} colorScheme={props.colorScheme} title={option}/>,
                "Items assigned for each member":<BarChart data={getAssignation()} colorScheme={props.colorScheme} title={option}/>,
                "Items opened by each member":<BarChart data={getCreated()} colorScheme={props.colorScheme} title={option}/>
            }[option]
        }
        
        </Stack>

    );
}