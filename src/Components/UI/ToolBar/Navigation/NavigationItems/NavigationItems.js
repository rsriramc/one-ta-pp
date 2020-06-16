import React from "react";

import classes from "./NavigationItems.css";

import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => {
   return (
      <div className={classes.NavigationItems}>
         <NavigationItem hide={props.hide} exact={true} linkTo="/">
            Home
         </NavigationItem>
         <NavigationItem hide={props.hide} exact={true} linkTo="/subjects">
            Subjects
         </NavigationItem>
         <NavigationItem hide={props.hide} exact={true} linkTo="/pagenotfound">
            Dummy
         </NavigationItem>
      </div>
   );
};

export default navigationItems;
