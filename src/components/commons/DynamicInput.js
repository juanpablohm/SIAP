import React from 'react';
import IconButton from '@mui/material/IconButton';
import {  Box, Grid, InputAdornment, Paper, TextField, Tooltip, Typography} from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DatePickerMUI from './DatePickerMUI';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';


const DinamicInput = ({values, model, setFunction, type, title, toolTips}) => {

    
    const handleChangeInputs = (id, name, newValue) => {
		const index = values.findIndex((m) => m.id === id)

        if( type === "pay" && name === "description"){
            name = "amount";
        }

		let _values = [...values] 
		_values[index][name] = newValue
		setFunction(_values)
	}

    const addMemberRow = () => {
		let _values = [...values]
		_values.push(model)
		setFunction(_values)
	}

    const removeMemberRow = (id) => {
		let _values = [...values]
		_values = _values.filter((m) => m.id !== id)
		setFunction(_values)
	}

    const getIcon = () =>{
        if( type === "pay"){
            return ( {
                startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                ),
              });
        }else{
            return (null);
        }
    }

    const getType = (type, value) => {
        if (type === "genObjetives" || type === "speObjetives" ) {
            return (<Grid item  xs={10} md={10} lg={10}>
                        <TextField sx={{mb:2}}
                            name="description"
                            label={''}
                            multiline
                            size='Small'
                            maxRows={4}
                            value={value.description}
                            variant="standard" 
                            fullWidth                  
                            onChange={(e) => handleChangeInputs(value.id, e.target.name, e.target.value)}
                        />
                    </Grid>
        )} 
        else{
            return (<>

                <Grid item xs={5} md={5} lg={7}>
                
                        <TextField sx={{mb:2}}
                            name="description"
                            label=""
                            multiline
                            size='Small'
                            maxRows={4}
                            value={type ==="pay" ? value.amount :value.description}
                            variant="standard" 
                            InputProps={getIcon()}
                            fullWidth                                   
                            onChange={(e) => handleChangeInputs(value.id, e.target.name, e.target.value)}
                        />
                </Grid>
                 <Grid item sx={{mb:2}} xs={3} md={3} lg={3}>
                    <DatePickerMUI
                        name="date"
                        label=""                      
                        value={value.date} 
                        Style={true}
                        onChange={(newValue) => handleChangeInputs(value.id, "date", newValue)}/>                     
                 </Grid></>
            );
        }      
    };
     
    return (       
          <Paper sx={{p:3}}>  
                <Typography  sx={{textAlign:'left', mb:2, fontSize: 15 }} color="text.secondary" >
                                {title} 
                    {toolTips != null ? ( <Tooltip  sx={{m:0, p:0, float: 'right'}} title={toolTips}>
                        <IconButton>
                            <HelpOutlineRoundedIcon />
                        </IconButton>
                    </Tooltip> ) : (<> </>)} 
                        
                </Typography> 

               
                
            {values instanceof Array? (    
                values.map((value) => (                     
                    
                    <Grid container sx={{mx:'auto'}} spacing={3} key={value.id}>
                
                        {getType(type, value)}

                        <Grid item  lg={2}>    
                            <IconButton size="small" onClick={addMemberRow} ><AddRoundedIcon fontSize="small"/></IconButton>

                            {values.length > 1 && (            
                                <IconButton size="small" onClick={() => removeMemberRow(value.id)} >
                                    <CloseRoundedIcon fontSize="small"/>
                                </IconButton>
                            )} 
                        </Grid>
                    </Grid>                  
                ))
            ) : (null)}             
        </Paper>
    );
};


export default DinamicInput; 