import * as api from "../api/index";
import { AUTH, FORGET_USER, REMEMBER_USER } from "./constants";

export const signin = (formData, setLoading, navigate) => async (dispatch) => {

  try {
    //login the user
    console.log(formData);
    const { data } = await api.signIn(formData);
    if (formData.rememberMe) {
      let rememberUserData = {
        usuario: formData.username,
        clave: formData.password,
        recuerdame: formData.rememberMe,
      };
      dispatch({ type: REMEMBER_USER, rememberUserData });
    } else {
      dispatch({ type: FORGET_USER });
    }

    dispatch({ type: AUTH, data });
    setLoading(false);
    console.log(data);
    // if (data?.data?.user?.role === 'USER') {
    //   navigate("/templates");
    // } else {
    //   console.log(data)
    //   navigate("/users");
    // }

  } catch (error) {
    // console.log(error);
    setLoading(false);
  }
};
