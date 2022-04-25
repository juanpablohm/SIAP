import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Stack } from '@mui/material';

export default function InputTimePicker({label, value, onChange}) {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack>
        <TimePicker
          label={label}
          value={value}
          onChange={onChange}
          renderInput={(params) => <TextField variant="standard" size="small" {...params} />}
        />
      </Stack>
   
    </LocalizationProvider>
  );
}