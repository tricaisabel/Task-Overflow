import TextField from '@mui/material/TextField';
import { useState } from 'react';
import {useSelector} from 'react-redux';
import MembersAuto from './MembersAuto';
import { Button } from '@mui/material';
import { Stack } from '@mui/material';

export default function NewMessage(props){
    let user=useSelector((state)=>state.user);
    const date=new Date().toISOString();
    const [recipients,setRecipients]=useState([]);
    const [message,setMessage]=useState({
        title:"",
        content:"",
        sender:user.firstName+" "+user.lastName,
        recipient:"",
        time:date.slice(0,date.indexOf("T")),
        type:props.type,
        color:user.color
    });

    function changeState(field,value){
        let newState={...message};
        newState[field]=value;
        setMessage(newState);
    }

    async function handleSubmit(){
        message.recipient=["all"];
        const response = await fetch(`http://localhost:3001/api/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
        });
        if (response.status === 200) {
            alert("The new message was successfully sent");
            changeState("title","");
            changeState("content","");

            props.getMessages();
        }
        else{
            alert("Unfortunately something went wrong. Try again.");
        }
    }

    return(
        <>
        <Stack spacing={2} width="0.8">
            {/* <MembersAuto setValue={setRecipients} title="Send to:"/> */}
            <TextField 
                label="Title" 
                variant="outlined" 
                required
                rows={4}
                width="100%"
                value={message.title}
                onChange={(e) =>changeState("title",e.target.value)}/>
            <TextField 
                label="Message" 
                variant="outlined" 
                required 
                multiline 
                rows={4}
                width="100%"
                value={message.content}
                onChange={(e) =>changeState("content",e.target.value)}/>
            <Button onClick={handleSubmit} variant="contained">Submit</Button>
        </Stack>
        </>
    );
}