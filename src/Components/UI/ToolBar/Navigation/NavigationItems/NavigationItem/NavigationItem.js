import React from "react";

import classes from "./NavigationItem.css";

import { NavLink } from "react-router-dom";

const navigationItem = (props) => {
   return (
      <NavLink onClick={() => props.hide()} className={classes.NavItem} to={props.linkTo} exact={props.exact} activeClassName={classes.active}>{props.children}</NavLink>
   );
}

export default navigationItem;
