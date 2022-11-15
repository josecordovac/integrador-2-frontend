import * as React from "react";
import { MenuItem } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Select } from '../../../interfaces/select';

interface InputComponentProps {
  list: Select[] | [],
  label: string,
  onChange(ev:any):void,
  value: number | undefined,
  name: string,
  disabled?: boolean,
  className?: any,
}

export const SelectComponent = React.memo(
  ({
    list,
    label,
    onChange,
    value,
    name,
    disabled,
    className,
  }: InputComponentProps): JSX.Element => {
    const handleChange = (ev:any) => {
      if (onChange) {
        onChange(ev);
      }
    };

    return (
      <TextField
        style={{ width: "100%" }}
        className={className}
        variant="outlined"
        value={
          list?.length > 0
            ? list.filter((x) => x.value === value).length > 0
              ? value
              : 0
            : 0
        }
        label={label}
        size="small"
        onChange={handleChange}
        name={name}
        select
        fullWidth
        InputProps={{
          inputProps: {
            readOnly: disabled || false,
          },
        }}
      >
        <MenuItem
          value={0}
          key={"Seleccione"}
          style={{ display: "block", padding: "6px 10px" }}
        >
          Seleccione
        </MenuItem>

        {list?.length > 0 &&
          list?.map((x, i) => (
            <MenuItem
              value={x.value}
              key={`${x.label}_${i}`}
              style={{ display: "block", padding: "6px 10px" }}
            >
              {x.label == "" || x.label == null ? "No Label" : x.label}
            </MenuItem>
          ))}
      </TextField>
    );
  }
);

export default SelectComponent;
