import {Outlet} from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const InnerContent=() =>{
  return (

    <Box
    component="main"
    sx={{
      backgroundColor: (theme) =>
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[900],
      flexGrow: 1,
      height: '100vh',
      width: '100vh',
      overflow: 'auto',
    }}
  >
    <Toolbar />
   
      
        <Outlet/>
        
   
  </Box>
  
  );
  
  
}

export default InnerContent;