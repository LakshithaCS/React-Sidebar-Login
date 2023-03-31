import { FORGET_USER, REMEMBER_USER} from "../actions/constants";
import { decrypt, encrypt } from "../utils/utils";

const rememberUserReducer = (state = { rememberUserData: null }, action) => {
  switch (action.type) {
    case REMEMBER_USER:
      let encryptedData = encrypt({ ...action?.rememberUserData });
      localStorage.setItem("rememberUser", JSON.stringify(encryptedData));

      let decryptedData = decrypt(encryptedData);
      return { ...state, rememberUserData: decryptedData };

    case FORGET_USER:
      localStorage.removeItem("rememberUser");
      return { ...state, rememberUserData: null };

    default:
      const rememberUser = JSON.parse(localStorage.getItem("rememberUser"));
      let decryptedDefaultData = decrypt(rememberUser);
      return { ...state, rememberUserData: decryptedDefaultData };
  }
};

export default rememberUserReducer;
