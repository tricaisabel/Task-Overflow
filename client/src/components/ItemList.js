import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

const columns = [
  { field: 'type', headerName: 'Type', width: 130 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'description', headerName: 'Description', width: 500 },
  { field: 'openedBy', headerName: 'Opened By',width: 150,},
  { field: 'assignedTo', headerName: 'Assigned To',width: 150,},
  { field: 'progress', headerName: 'Progress',width: 100, type:'number'},
  { field: 'deadline', headerName: 'Deadline',width: 150}
];


export default function DataTable(props) {
    const [tableData,setTableData] = React.useState([]);
    let items=useSelector((state)=>state.items);
    useEffect(()=>{
        props.getItems();
        setTableData(items);
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
