export const handleInputChanges = (
  { target },
  data,
  setData,
  setValue,
  arr
) => {
  setData({
    ...data,
    [target.name]:
      target.type == "checkbox" || target.type == "radio"
        ? target.checked
        : target.value,
  });

  if (arr) {
    const { label } = arr.find((x) => x.value == target.value);
    setValue(label);
  }
};
