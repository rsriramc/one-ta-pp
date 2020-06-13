import React from "react";

import classes from "./SideBarLinks.css";
import { NavLink } from "react-router-dom";

const sideBarLinks = (props) => {
   return (
      <div className={classes.SideBarLinks}>
         <NavLink to={props.link}>{props.children}</NavLink>
      </div>
   );
};

export default sideBarLinks;
