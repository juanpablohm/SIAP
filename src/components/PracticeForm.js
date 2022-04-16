import React from 'react';

import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { Container, Paper, Grid } from "@mui/material";
import { Link, BrowserRouter } from "react-router-dom";
import { IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

const  PracticeForm=() =>{

  const docs = [
 
    { uri: require("./prueba.pdf") }
  ];
    return (

      <div>
           <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} />
      </div>
           

      
      
    );
}
{/* <Grid container  lg={11} sx={{mt:5, mx:"auto"}}>
<Link to={"/practicas"} style={{ textDecoration: 'none'}}>
  <IconButton aria-label="delete" >
          <ChevronLeftIcon fontSize="large" />
  </IconButton>
</Link>


</Grid> */}

export default PracticeForm;