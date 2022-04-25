import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

export default function DatePickerMUI({label, value, onChange, Style}) {
/*   const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  }; */

  const getStyle = () => {
    if (Style){
      return "standard";
    }else{
      return "outlined";
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack>
        <DesktopDatePicker
          label={label}
          inputFormat="MM/dd/yyyy"
          value={value}        
          onChange={onChange}
          renderInput={(params) => <TextField variant={getStyle()}  {...params} />}
        />
       
      </Stack>
    </LocalizationProvider>
  );
}
