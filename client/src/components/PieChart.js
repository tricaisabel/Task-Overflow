import * as d3 from 'd3';
import {useEffect} from 'react';
import { Stack, Typography } from '@mui/material';
import FiberManualRecord from '@mui/icons-material/FiberManualRecord'

export default function PieChart(props){
    const keys=props.countsByType.map(each=>each.type);
    function drawChart(){
        const svg=d3.select('#pieChart');
        // Creating Pie generator
        var pie = d3.pie();
  
        // Creating arc
        var arc = d3.arc()
                    .innerRadius(0)
                    .outerRadius(100);
  
        let g = svg.append("g")
                   .attr("transform", `translate(150,100)`);
  
        // Grouping different arcs
        var arcs = g.selectAll("arc")
                    .data(pie(props.countsByType.map(each=>each.count)))
                    .enter()
                    .append("g");
  
        // Appending path 
        arcs.append("path")
            .attr("fill", (item,i)=>{
                let value=item.data;
                return props.colorScheme[i];
            })
            .attr("d", arc);
          
        // Adding data to each arc
        arcs.append("text")
            .attr("transform",(item)=>{ 
                    return `translate(${arc.centroid(item)})`; 
            })
            .text(function(item,i){
               return item.data; 
               });
    }

    useEffect(()=>{
        drawChart();
    },[props.title]);

    return(
        <>
        <Typography variant="h5">{props.title}</Typography>
        <Stack width="0.5" direction="row" alignContent="center">
            <Stack>
            {
                props.countsByType.map((each,i)=><Typography key={i} color={props.colorScheme[i]}>{each.type}s</Typography>)
            }
            </Stack>
            <svg id="pieChart" width="300px" height="300px"></svg>
        </Stack>
        </>
    );
}