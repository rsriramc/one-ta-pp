import React from "react";

import classes from "./NavigationItem.css";

import { NavLink } from "react-router-dom";

const navigationItem = (props) => {
   if (props.linkTo !== "/unn")
      return (
         <NavLink
            onClick={() => props.hide()}
            className={classes.NavItem}
            to={props.linkTo}
            exact={props.exact}
            activeClassName={classes.active}
         >
            {props.children}
         </NavLink>
      );
   else {
      return (
         <div onClick={() => { props.hide(); props.clicked()}} className={classes.NavItem}>
            {props.children}
         </div>
      );
   }
};

export default navigationItem;
