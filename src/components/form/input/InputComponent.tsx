import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
// import InputAdornment from '@mui/material/InputAdornment';

interface InputComponentProps {
  label?: string;
  value: string | undefined;
  onChange(ev: any): void;
  name: string;
  disabled?: boolean;
  type: string;
  className?: any;
  min?:number;
  max?: number;
  required?: boolean;
}

const InputComponent= React.memo(({label, value, onChange, name, disabled, type, className, min, max, required }: InputComponentProps): JSX.Element => {
  
  const handleChange = (ev: any):void => {
    const value_ant = value;
    if(type=="decimal"){
      if(min){
        if(parseFloat(ev.target.value) < min ){
          ev.target.value = value_ant;
        }
      }
      if(max){
        if(parseFloat(ev.target.value) > max ){
          ev.target.value = value_ant;
        }
      }
    }
    
    if(onChange){
        onChange(ev);
    }
  }

  const handlePress = (e:any) => {
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
          type={type} 
          variant="outlined" 
          size="small" 
          name={name} 
          onChange={handleChange} 
          value={ value } 
          fullWidth={true} 
          onKeyPress={handlePress}
          autoComplete="false"
          required={required || false}

          InputProps={{    
            inputProps: { 
                max, 
                min,
                type,
                readOnly: disabled || false
            },
          }}
          InputLabelProps={{
            shrink: (type == 'datetime-local' || type == 'date' || type == 'time' ? true : undefined),
          }}
        />
  )
});

export default InputComponent;