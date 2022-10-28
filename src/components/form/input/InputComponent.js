import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
// import InputAdornment from '@mui/material/InputAdornment';

const InputComponent = React.memo(({label, value, onChange, name, disabled, type, className , error = null, min, max, precision, icon, autoComplete, onEnter, required }) => {
  
  const handleChange = (ev) => {
    const value_ant = value;
    if(type=="decimal"){
      if(min){
        if(parseFloat(ev.target.value) < parseFloat(min) ){
          ev.target.value = value_ant;
        }
      }
      if(max){
        if(parseFloat(ev.target.value) > parseFloat(max) ){
          ev.target.value = value_ant;
        }
      }
    }
    
    if(onChange){
        onChange(ev);
    }
  }
  
  const handleInput = (e) => {
    if(type == 'decimal'){
      let t = e.target.value;
      let pre = (precision) ? (precision + 1) : 4;
      e.target.value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), pre)) : t;
    }
  }

  const handlePress = (e) => {
    if(onEnter){
      if(e.charCode == 13){
        onEnter();
      }
    }
    if(type=='decimal'){
      if(e.charCode >= 58 && e.charCode <=127 || e.charCode >= 33 && e.charCode <=44 || e.charCode == 47 || e.charCode == 45) {
        e.preventDefault()
      }
    }
  }

  return (
        <TextField
        style={{ width: "100%" }} 
        className={className || ''}
        id="outlined-basic"
        label={label} 
        type={(type=='decimal' || type) ? "text" : type} 
        variant="outlined" 
        size="small" 
        name={name} 
        onChange={handleChange} 
        value={ (value == undefined || value == null || value == '') ? '' : value } 
        fullWidth={true} 
        onInput={handleInput}
        onKeyPress={handlePress}
        autoComplete={autoComplete || 'off'}
        required={required || false}
        // minDate={(type == 'datetime-local' || type == 'date' ? min : undefined)}
        // maxDate={(type == 'datetime-local' || type == 'date' ? max : undefined)}        
        InputProps={{    
          inputProps: { 
              max, 
              min,
              type,
              readOnly: disabled || false
          },
          // startAdornment: <InputAdornment position="end">kg</InputAdornment>,
          endAdornment: <InputAdornment position="end">{icon || ''}</InputAdornment>,
          
        }}
        InputLabelProps={{
          shrink: (type == 'datetime-local' || type == 'date' || type == 'time' ? true : undefined),
        }}
        {...(error && {error:true, helperText: error, required: true})}
        />
  );
})

export default InputComponent;