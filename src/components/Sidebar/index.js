import { Link } from "react-router-dom";
import React from 'react';
import "./index.css";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
//import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
//import { LOGOUT } from "../../actions/constants";
import { Stack, Avatar, Button, Typography } from "@mui/material";
import { stringAvatar } from "../../utils/utils";
//import { useLocation } from 'react-router-dom'

const Sidebar = (prop) => {

  const user = {
    user: {
      fname: "Laskhitha",
      sname: "Srimal",
    }
  } //useSelector((state) => state.auth.authData);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const logout = () => {
    // dispatch({ type: LOGOUT });
    // navigate("/login");
  };

  return (

    <div>
      <header className={`header ${prop.show ? "space-toggle" : null}`}>
        <div className="header-toggle" onClick={() => prop.setShow(!prop.show)}>
          <i
            className={`fas fa-bars ${prop.show ? "fa-solid fa-xmark" : null}`}
          ></i>
        </div>
      </header>

      <aside className={`sidebar ${prop.show ? "show" : null}`}>
        <nav className="nav">
          <div>
            <Link to="/" className="nav-logo" style={{ color: 'inherit', textDecoration: 'inherit' }}>
              <img className="nav-logo-icon" src={require("../../assets/images/smart-spider-white.png")} alt="" />
              <span className="nav-logo-name">
                SMART <br></br> CONNECTOR
              </span>
            </Link>

            <div className="nav-user">
              <Avatar
                className="nav-user-avatar"
                {...stringAvatar(
                  `${user?.user?.fname} ${user?.user?.lname}`
                )}
              />
              <Typography className="nav-user-name" color="#ffff">
                {user?.user?.fname} <br /> {user?.user?.lname}
              </Typography>
            </div>

            <div className="nav-list">
              {user.user.role === 'USER' && SidebarData.USER.map((item, index) => {
                return <SubMenu show={prop.show} item={item} key={index} />;
              })}
              {user.user.role === 'ADMIN' && SidebarData.ADMIN.map((item, index) => {
                return <SubMenu show={prop.show} item={item} key={index} />;
              })}
            </div>
          </div>

          <Link className="nav-link" onClick={() => logout()}>
            <i className="fas fa-sign-out nav-link-icon"></i>
            <span className="nav-link-name">Logout</span>
          </Link>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
