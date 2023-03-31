import React from "react";
import { useField } from "formik";
import { TextField } from "@mui/material";

const TextfieldWrapper = ({ name, ...otherProps }) => {
  const [field, mata] = useField(name);

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
  };

  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }

  return (
    <TextField
      {...configTextfield}
      margin="dense"
      inputProps={{ style: { fontSize: 13 } }}
      InputLabelProps={{ style: { fontSize: 13 } }}
      FormHelperTextProps={{ style: { fontSize: 11 } }}
    />
  );
};

export default TextfieldWrapper;
