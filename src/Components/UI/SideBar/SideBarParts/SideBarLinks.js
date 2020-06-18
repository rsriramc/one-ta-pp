import React from "react";

import classes from "./SideBarLinks.css";
import { NavLink } from "react-router-dom";

const sideBarLinks = (props) => {
   return (
      <div className={classes["SideBarLinks" + props.prefer]}>
         <NavLink className={classes.SideBarLink} to={props.link} activeClassName={classes.active}>{props.children}</NavLink>
      </div>
   );
};

export default sideBarLinks;
