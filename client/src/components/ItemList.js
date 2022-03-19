import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {useEffect} from 'react';

const columns = [
  { field: '_id', headerName: 'Id', width: 200 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'type', headerName: 'Type', width: 130 },
  { field: 'description', headerName: 'Description', width: 300 },
  { field: 'openedBy', headerName: 'Opened By',width: 100,},
  { field: 'assignedTo', headerName: 'Assigned To',width: 100,},
  { field: 'progress', headerName: 'Progress',width: 250, type:'number'}
];


export default function DataTable() {
    const [tableData,setTableData] = React.useState([]);

    async function getItems(){
        const response = await fetch(`http://localhost:3001/api/items`);
        if(response.status===200){
            const data=await response.json(); 
            let rows=data;
            rows.forEach((item)=>{
                delete item["__v"];
                delete item.timing;
                delete item.projectId;
                delete item.dependencies;
            }) 
            setTableData(rows);
            console.log(tableData);      
        }
    }

    useEffect(()=>{
        getItems();
    },[]);

    return (
        <div style={{ height: 400, width: '100%'}}>
        <DataGrid
            rows={tableData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row._id}
        />
        </div>
    );
}
