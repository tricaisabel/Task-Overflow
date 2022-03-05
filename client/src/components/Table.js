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


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper} sx={{m:3, width:'auto'}}>
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
          {rows.map((row) => (
            <TableRow key={row.name} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left" component="th" scope="row" sx={{width:0.2}}>{row.name}</TableCell>
                <TableCell align="left" sx={{width:0.3}}>{row.calories}</TableCell>
                <TableCell align="left" sx={{width:0.1}}>{row.fat}</TableCell>
                <TableCell align="left" sx={{width:0.2}}>
                    <LinearProgress variant="determinate" value={row.carbs} sx={{borderRadius:5}}/>
                </TableCell>
                <TableCell align="right" sx={{width:0.07}}>
                    <Tooltip title="Cindy Baker" placement="right">
                      <Avatar alt="Cindy Baker" src="#"/>
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
