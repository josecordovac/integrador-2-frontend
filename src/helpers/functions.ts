
import { Select } from "../interfaces/select";

export const handleInputChanges = <T>(
  {target}: React.ChangeEvent<HTMLInputElement>, 
  dataF: T, 
  setDataF: React.Dispatch<React.SetStateAction<T>>, 
  setValue?: React.Dispatch<React.SetStateAction<string>>,
  arr?: Select[]
  ): void => {
 
  setDataF({
    ...dataF,
    [target.name]:
      target.type == "checkbox" || target.type == "radio"
        ? target.checked
        : target.value,
  });
  
  if (arr) {
    const label = arr.find((x) => x.value === Number(target.value))!.label
    
    if (setValue) setValue(label);
  }
};
