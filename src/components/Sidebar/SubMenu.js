import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const SubMenu = ({ show, item }) => {
  const location = useLocation();

  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <NavLink
        onClick={item.subNav && showSubnav}
        to={item.path}
        className={(navData) =>
          item.path
            ? navData.isActive || location.pathname.includes(item.activePath)
              ? "nav-link active"
              : "nav-link"
            : location.pathname.includes(item.activePath)
            ? "nav-link active"
            : "nav-link"
        }
      >
        {!show ? (
          <Tooltip title={item.title} placement="right-end">
            <i className={`${item.icon} nav-link-icon`}></i>
          </Tooltip>
        ) : (
          <i className={`${item.icon} nav-link-icon`}></i>
        )}
        <div style={{ whiteSpace: "nowrap" }}>
          <span className="nav-link-name">{item.title}</span>
          <i
            className={`${
              item.subNav && subnav
                ? item.iconOpened
                : item.subNav
                ? item.iconClosed
                : null
            } nav-link-drop-down-icon`}
          ></i>
        </div>
      </NavLink>
      {item.subNav &&
        item.subNav.map((item, index) => {
          return (
            <NavLink
              to={item.path}
              key={index}
              className={(navData) =>
                navData.isActive
                  ? `${
                      subnav ? "sub-expand" : "sub-collapse"
                    } nav-sub-link sub-active`
                  : `${subnav ? "sub-expand" : "sub-collapse"} nav-sub-link`
              }
            >
              {!show ? (
                <Tooltip title={item.title} placement="right-end">
                  <i className={`${item.icon} nav-sub-link-icon`}></i>
                </Tooltip>
              ) : (
                <i className={`${item.icon} nav-sub-link-icon`}></i>
              )}
              <span className="nav-sub-link-name">{item.title}</span>
            </NavLink>
          );
        })}
    </>
  );
};

export default SubMenu;
