import {Outlet} from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';


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