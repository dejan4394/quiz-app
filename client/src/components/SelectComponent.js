import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({label, queryArray, onChange, value}) {
  

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name={label}
          value={value}
          label={label}
          onChange={onChange}
        >
         {queryArray &&
              queryArray.map((item, idx) => (
                <MenuItem value={item} key={idx}>
                   {item} 
                </MenuItem>
              ))}
        </Select>
      </FormControl>
    </Box>
  );
}
