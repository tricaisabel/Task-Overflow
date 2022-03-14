import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TaskAlt from '@mui/icons-material/TaskAlt';
import {useEffect,useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../state/actionCreators';

const ResponsiveAppBar = () => {
  let user=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  const {updateUserField}=bindActionCreators(actionCreators,dispatch);

  const navigate = useNavigate();
  const [profilePicture,setProfilePicture]=useState("");

  function logOut(){
    updateUserField("logged",false);
    navigate("/");
  }

  useEffect(()=>{
    setProfilePicture(localStorage.getItem(user.profilePicture));
  },[])

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{justifyContent:"space-between"}}>
          <Stack
          sx={{ width: 'auto' }}
          direction="row" 
          justifyContent="end" 
          alignItems="center" 
          spacing={2}>
            <TaskAlt color="white" sx={{ fontSize: 40, mr:1}} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              Task Overflow
            </Typography>
          </Stack>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Task Overflow
          </Typography>
          {
            user.logged && 
            <>
            <Stack
              sx={{ width: '55%' }}
              direction="row" 
              justifyContent="end" 
              alignItems="center" 
              spacing={2}>
              <MenuItem >
                  <Typography textAlign="center">Project</Typography>
              </MenuItem>
              <MenuItem >
                  <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={logOut}>
                  <Typography textAlign="center">Log out</Typography>
              </MenuItem>
            </Stack>

            <Stack
              sx={{ width: 'auto' }}
              direction="row" 
              justifyContent="end" 
              alignItems="center" 
              spacing={2}>
              <Typography variant="h6" textAlign="center">{user.firstName+" "+user.lastName}</Typography>
              <Tooltip title={user.username}>
                <IconButton sx={{ p: 0 }}>
                <Avatar id="avatar" alt={user.firstName} src={profilePicture} /> 
                </IconButton>
              </Tooltip>
            </Stack>
            </>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
