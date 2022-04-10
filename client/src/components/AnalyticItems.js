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
            {type:"Task",count:0},
            {type:"Bug",count:0},
            {type:"Issue",count:0}
        ];
        items.map(item=>{
            let element=countsByType.find(element=>element.type.toLowerCase()===item.type);
            element.count++;
        });
        return countsByType;
    }
    
    function daysDifference(item) {
        const time_diff = new Date(item.deadline).getTime() - new Date().getTime();
        const days_diff = time_diff / (1000 * 3600 * 24);
        return Math.round(days_diff);
    }

    function getCountByRisk(){
        let countsByRisk=[
            {type:"Low risk item",count:0},
            {type:"Medium risk item",count:0},
            {type:"High risk item",count:0}
        ];
        items.map(item=>{
            const difference=daysDifference(item);
            if(difference>3)
                countsByRisk[0].count++;
            else if (difference<=3 && difference>0)
                countsByRisk[1].count++;
            else if(difference<=0)
                countsByRisk[2].count++;
        });
        console.log(countsByRisk);
        return countsByRisk;
    }

    getCountByRisk();

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
            </Select>
        </FormControl>
        {
            {
                "Items by type":<PieChart countsByType={getCountsByType()} colorScheme={props.colorScheme} title={option}/>,
                "Items by deadline":<PieChart countsByType={getCountsByType()} colorScheme={props.colorScheme} title={option}/>,
                "Items assigned for each member":<BarChart colorScheme={props.colorScheme} title={option}/>
            }[option]
        }
        
        </Stack>

    );
}