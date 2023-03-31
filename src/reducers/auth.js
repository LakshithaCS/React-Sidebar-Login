import { AUTH, LOGOUT } from "../actions/constants";
import { decrypt, encrypt } from "../utils/utils";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      let encryptedData = encrypt({ ...action?.data.data });
      localStorage.setItem("profile", JSON.stringify(encryptedData));

      let decryptedData = decrypt(encryptedData);
      return { ...state, authData: decryptedData };

    case LOGOUT:
      localStorage.removeItem("profile");
      return { ...state, authData: null };

    default:
      const user = JSON.parse(localStorage.getItem("profile"));
      let decryptedDefaultData = decrypt(user);
      return { ...state, authData: decryptedDefaultData };
  }
};

export default authReducer;
