import React from "react";
import { useField, useFormikContext } from "formik";
import { Autocomplete, TextField } from "@mui/material";

const AutoCompleteWrapper = ({name, options, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, mata] = useField(name);
  //console.log(field);

  const handleChange = (event, value, reason) => {
    setFieldValue(name, value);
  };

  const configAutocomplete = {
    ...field,
    ...otherProps,
    variant: "outlined",
    fullWidth: true,
  };

  if (mata && mata.touched && mata.error) {
    configAutocomplete.error = true;
    configAutocomplete.helperText = mata.error;
  }

  return (
    <Autocomplete
      onInputChange={handleChange}
      options={options}
      renderInput={(params) => (
        <TextField {...params} {...configAutocomplete} />
      )}
    />
  );
};

export default AutoCompleteWrapper;
