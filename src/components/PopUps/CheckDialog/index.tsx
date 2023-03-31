import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import CancelIcon from "@mui/icons-material/Cancel";
import LockIcon from "@mui/icons-material/Lock";
import Stack from "@mui/material/Stack";
import { Form, Formik } from "formik";
import * as Yup from "yup";
// @ts-ignore
import Textfield from "../../FormsUI/Textfield";
import { Container, Grid } from "@mui/material";
import { Button } from "@mui/material";
import create from "zustand";

type CheckDialogStore = {
  title: string;
  message: string;
  onSubmit?: (p: any) => void;
  checkBtnDisable?: boolean,
  close: boolean;
};

const useCheckDialogStore = create<CheckDialogStore>((set) => ({
  title: "",
  message: "",
  onSubmit: undefined,
  checkBtnDisable: false,
  close: false,
}));

export const openCheckDialog = (
  title: string,
  message: string,
  onSubmit?: (p: any) => void,
) => {
  useCheckDialogStore.setState({
    title: title,
    message: message,
    onSubmit: onSubmit,
    checkBtnDisable: false,
    close: true,
  });
};

export const disableBtnCheckDialog = (val: boolean) => {
  useCheckDialogStore.setState({
    checkBtnDisable: val,
  });
};

export const closeCheckDialog = () => {
  useCheckDialogStore.setState({
    close: false,
  });
};

const CheckDialog: React.FC = () => {
  const { title, message, onSubmit, checkBtnDisable, close } = useCheckDialogStore();

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const INITIAL_FORM_STATE = {
    username: "",
    password: "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    username: Yup.string().required("Please Enter your username"),
    password: Yup.string()
      .required("Please Enter your password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClose = () => {
    useCheckDialogStore.setState({
      close: false,
    });
  };

  return (
    <div>
      <Dialog
        open={close}
        onClose={handleClose}
        fullWidth={true}
        className="scf-modal"
        PaperProps={{
          style: { borderRadius: 15 },
        }}
      >
        <IconButton
          color="primary"
          className="scf-btn-modal-close"
          onClick={handleClose}
        >
          <CancelIcon />
        </IconButton>
        <Container>
          <Grid
            container
            style={{ marginTop: "40px", justifyContent: "center" }}
            direction="row"
          >
            <Grid item className="scf-modal-row">
              <i className="fas fa-circle-info scf-status-syb scf-status-syb__stop-icon"></i>
            </Grid>
          </Grid>
        </Container>
        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE,
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values) => {
            if (onSubmit) {
              onSubmit(values);
            }
          }}
        >
          <Form>
            <DialogTitle
              style={{ textAlign: "center" }}
              className="scf-page-title"
            >
              {title}
            </DialogTitle>
            <DialogContent style={{ textAlign: "center" }}>
              <DialogContentText className="scf-page-message">
                {message}
              </DialogContentText>

              <Stack direction="row" margin={"15px 0px 15px 0px"}>
                <Textfield
                  type={"text"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                  name="username"
                  label="Username"
                  placeholder="Username"
                />
              </Stack>
              <Stack direction="row" margin={"15px 0px 0px 0px"}>
                <Textfield
                  type={values.showPassword ? "text" : "password"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  name="password"
                  label="Password"
                  placeholder="Password"
                />
              </Stack>
            </DialogContent>
            <DialogActions
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                onClick={handleClose}
                variant="outlined"
                style={{ fontWeight: "bold" }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                style={{ fontWeight: "bold" }}
                disabled={checkBtnDisable}
              >
                Check
              </Button>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
    </div>
  );
};

export default CheckDialog;
