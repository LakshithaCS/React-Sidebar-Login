import { combineReducers } from "redux";

import auth from "./auth";
import rememberUser from "./rememberUser";

export default combineReducers({ auth, rememberUser });
