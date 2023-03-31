import axios from "axios";
import { openErrorDialog } from "../components/PopUps/ErrorDialog/index.tsx";
import { decrypt } from "../utils/utils";

const interceptor = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL });

interceptor.interceptors.request.use(
  (req) => {
    if (localStorage.getItem("profile")) {

      const user = JSON.parse(localStorage.getItem("profile"));
      let decryptedDefaultData = decrypt(user);
      let token = decryptedDefaultData.token;
      req.headers[
        "Authorization"
      ] = `Bearer ${token}`;
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response.status === 401
    ) {
      openErrorDialog(error.response.data.status, error.response.data.comment);
      localStorage.removeItem("profile");
      window.location.replace("/login");
    } else {
      return error;
    }
  }
);

export default interceptor;
