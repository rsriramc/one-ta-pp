import React from "react";

import classes from "./SideDrawer.css";

import NavigationItems from "../ToolBar/Navigation/NavigationItems/NavigationItems";

const sideDrawer = (props) => {
   return (
      <div
         className={classes.SideDrawer}
         style={{ right: props.isOpened ? "0" : "-100vw" }}
      >
         <NavigationItems isAuth={props.isAuth} hide={props.hide} logout={props.logout}/>
      </div>
   );
};

export default sideDrawer;
