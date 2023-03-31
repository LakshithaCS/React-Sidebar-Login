import React from "react";
import { useField, useFormikContext } from "formik";
import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DateTimePicker = ({ name, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (evt) => {
    setFieldValue(name, evt);
  };

  const configDateTimePicker = {
    ...field,
    ...otherProps,
    onChange: handleChange,
  };

  const configTextField = {
    variant: "outlined",
    fullWidth: true,
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="date picker template"
        {...configDateTimePicker}
        renderInput={(params) => <TextField {...params} {...configTextField} />}
      />
    </LocalizationProvider>
  );
};

export default DateTimePicker;
