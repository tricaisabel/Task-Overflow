import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { LinearProgress } from '@mui/material'; 
import { Avatar } from '@mui/material';
import { Tooltip } from '@mui/material';
import {useSelector} from 'react-redux';
import {useState,useEffect} from 'react';

export default function BasicTable() {
  
  const projects=useSelector((state)=>state.projects);
  const [existProjects,setExistProjects]=useState("none");

  useEffect(()=>{
    if(projects.length>0)
      setExistProjects("block");
  },[projects]);

  return (
    <TableContainer component={Paper} sx={{m:3, width:'auto'}} display={existProjects}>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">Project Name</TableCell>
            <TableCell align="left">Project Description</TableCell>
            <TableCell align="left">Deadline</TableCell>
            <TableCell align="left">Progress</TableCell>
            <TableCell align="left">Manager</TableCell>
            <TableCell align="left">View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((row) => (
            <TableRow key={row.name} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left" component="th" scope="row" sx={{width:0.2}}>{row.name}</TableCell>
                <TableCell align="left" sx={{width:0.3}}>{row.description}</TableCell>
                <TableCell align="left" sx={{width:0.1}}>{row.deadline.slice(0,row.deadline.indexOf("T"))}</TableCell>
                <TableCell align="left" sx={{width:0.2}}>
                    <LinearProgress variant="determinate" value={row.progress} sx={{borderRadius:5}}/>
                </TableCell>
                <TableCell align="right" sx={{width:0.07}}>
                    <Tooltip title={row.manager.name} placement="right">
                      <Avatar alt={row.manager.name} src={localStorage.getItem(row.manager.picture)}/>
                    </Tooltip>
                </TableCell>
                <TableCell align="left" sx={{width:0.1, py:0}}>
                    <Button variant="outlined">Open</Button>
                </TableCell>
        </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
