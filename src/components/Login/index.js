import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { Form, Formik } from "formik";
import * as Yup from "yup";

// components
import Textfield from "../FormsUI/Textfield";
import Checkbox from "../FormsUI/Checkbox";
import Button from "../FormsUI/Button";
import Loader from "../Loader";
import { signin } from "../../actions/auth";

import "./index.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rememberMe = useSelector(
    (state) => state.rememberUser.rememberUserData
  );
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const INITIAL_FORM_STATE = {
    username: rememberMe?.usuario ? rememberMe?.usuario : "",
    password: rememberMe?.clave ? rememberMe?.clave : "",
    rememberMe: rememberMe?.recuerdame ? rememberMe?.recuerdame : false,
  };

  const FORM_VALIDATION = Yup.object().shape({
    username: Yup.string().required("Please Enter your username"),
    password: Yup.string()
      .required("Please Enter your password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    rememberMe: Yup.boolean().required("Required"),
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const getTimeWelcome = () => {
    const hours = new Date().getHours();

    if (+hours < 12) {
      return "Good Morning!";
    } else if ((+hours > 12 && +hours < 16) || +hours === 12) {
      return "Good Afternoon!";
    } else {
      return "Good Evening!";
    }
  };

  return (
    <div className="container">
      <div className="login-card">
        <div className="row no-gutters">
          <div className="col-md-5">
            <img
              src={require("../../assets/images/login.jpg")}
              alt="login"
              className="login-card-img"
            />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <div className="brand-wrapper">
                <img
                  src={require("../../assets/images/smart-spider.png")}
                  alt="logo"
                  className="logo"
                />
              </div>
              <Typography variant="subtitle1" color="text.secondary">
                {getTimeWelcome()}
              </Typography>
              <p className="login-card-description">Sign into your account</p>
              <Box sx={{ my: 3, mx: 2 }}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  margin={"0 0px 15px 0px"}
                ></Typography>
                <Divider variant="middle" />

                <Formik
                  initialValues={{
                    ...INITIAL_FORM_STATE,
                  }}
                  validationSchema={FORM_VALIDATION}
                  onSubmit={(values) => {
                    setLoading(true);
                    setTimeout(() => {
                      dispatch(signin(values, setLoading, navigate));
                    }, 1000);
                  }}
                >
                  <Form>
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
                          endAdornment: values.password ? (
                            <InputAdornment position="end">
                              <IconButton onClick={handleClickShowPassword}>
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ) : null,
                        }}
                        name="password"
                        label="Password"
                        placeholder="Password"
                      />
                    </Stack>
                    <Stack direction="row" textAlign={"end"}>
                      <Checkbox
                        size="small"
                        name="rememberMe"
                        label="Remember Me"
                        color="primary"
                      />
                    </Stack>
                    <Stack direction="column" margin={"15px 0px 5px 0px"}>
                      {/* <Link
                      href="#"
                      underline="none"
                      fontSize={"13px"}
                      align={"right"}
                      marginBottom={"5px"}
                    >
                      Forgot Password?
                    </Link> */}
                      <Button fullWidth variant="contained">
                        Log In
                      </Button>
                    </Stack>
                    <Stack
                      direction="row"
                      margin={"5px 0px 15px 0px"}
                      display={"flex"}
                      justifyContent={"center"}
                    >
                      {/* <Typography variant="subtitle2" color="text.secondary">
                      Don't have an account?
                    </Typography>
                    <Link href="#" underline="none" fontSize={"15px"}>
                      Sign Up
                    </Link> */}
                    </Stack>
                  </Form>
                </Formik>
              </Box>
              <a href="#!" className="forgot-password-link">
                Forgot password?
              </a>
              <p className="login-card-footer-text">
                Don't have an account?{" "}
                <a href="#!" className="text-reset">
                  Register here
                </a>
              </p>
              <nav className="login-card-footer-nav">
                <a href="#!">Terms of use.</a>
                <a href="#!">Privacy policy</a>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default Login;
