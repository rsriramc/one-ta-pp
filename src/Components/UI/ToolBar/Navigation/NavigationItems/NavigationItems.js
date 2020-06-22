import React from "react";

import classes from "./NavigationItems.css";

import NavigationItem from "./NavigationItem/NavigationItem";
// import Wrap from "../../../../../hoc/Wrap/Wrap";

const navigationItems = (props) => {
   return (
      <div className={classes.NavigationItems}>
         <NavigationItem hide={props.hide} exact={true} linkTo="/">
            Home
         </NavigationItem>
         {props.isAuth !== null ? (
            <NavigationItem hide={props.hide} exact={true} linkTo="/subjects">
               Subjects
            </NavigationItem>
         ) : null}
         {props.isAuth !== null &&
         props.isAuth !== "own" &&
         props.isAuth !== "demo" ? (
            <NavigationItem hide={props.hide} exact={true} clicked={props.logout} linkTo="/unn">
               Logout
            </NavigationItem>
         ) : null}
         <NavigationItem hide={props.hide} exact={true} linkTo="/pagenotfound">
            Dummy
         </NavigationItem>
      </div>
   );
};

export default navigationItems;
