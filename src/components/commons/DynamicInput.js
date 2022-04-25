import React from 'react';
import IconButton from '@mui/material/IconButton';
import {  Grid, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DatePickerMUI from './DatePickerMUI';


const DinamicInput = ({values, model, setFunction, type, title}) => {

    
    const handleChangeInputs = (id, name, newValue) => {
		const index = values.findIndex((m) => m.id === id)

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
            return (<Grid item md={10} lg={10}>
                        <TextField sx={{mb:2}}
                            name="desc"
                            label={''}
                            multiline
                            size='Small'
                            maxRows={4}
                            value={value.desc}
                            variant="standard" 
                            fullWidth                  
                            onChange={(e) => handleChangeInputs(value.id, e.target.name, e.target.value)}
                        />
                    </Grid>
        )}else{
            return (<>

                <Grid item xs={5} md={5} lg={7}>
                
                        <TextField sx={{mb:2}}
                            name="desc"
                            label=""
                            multiline
                            size='Small'
                            maxRows={4}
                            value={value.desc}
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
                <Typography sx={{textAlign:'left', mb:2, fontSize: 15 }} color="text.secondary" >
                                {title}
                </Typography>        
            {values.map((value) => (                     
                
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
            ))}             
        </Paper>
    );
};


export default DinamicInput; 