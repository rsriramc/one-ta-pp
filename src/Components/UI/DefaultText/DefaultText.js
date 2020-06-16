import React from "react";

import classes from "./DefaultText.css";

const defaultText = (props) => {
   return <div className={classes.DefaultText}>
      {props.children}
   </div>;
};

export default defaultText;
