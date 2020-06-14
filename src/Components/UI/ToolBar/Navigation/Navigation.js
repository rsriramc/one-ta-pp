import React from "react";

import classes from "./Navigation.css";

import NavigationItems from "./NavigationItems/NavigationItems";

const navigation = (props) => {
   return (
      <nav className={classes.Navigation}>
         <NavigationItems hide={() => { }}/>
      </nav>
   );
};

export default navigation;
