import * as React from 'react';
import { MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

export const SelectComponent = React.memo(({list, label, onChange, value, name, disabled, className, error = null}) => {

  const handleChange = (ev) => {
    if(onChange){
        onChange(ev);
    }
  }

  return (
        <TextField
          style={{ width: "100%"}}
          className={className}
          variant="outlined"
          value={(list?.length > 0) ? ((list.filter(x => x.value == value).length > 0) ? value : 0 ) : 0}
          label={label}
          size="small"
          onChange={handleChange}
          name={name}
          select
          fullWidth
          InputProps={{
            inputProps: { 
                readOnly: disabled || false
            }
          }}
          {...(error && {error:true, helperText: error, required: true})}
        >
          <MenuItem value={0} key={"Seleccione"}>Seleccione</MenuItem>
          
          {(list?.length > 0) && list?.map( (x,i) => (
              
                  <MenuItem value={x.value} key={`${x.label}_${i}`}>{(x.label == '' || x.label == null) ? 'No Label' : x.label}</MenuItem>
              
          )) }
        </TextField>
  );
})

export default SelectComponent;