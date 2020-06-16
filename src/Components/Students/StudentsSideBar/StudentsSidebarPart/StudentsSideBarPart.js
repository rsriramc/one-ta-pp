import React from "react";

import classes from "./StudentsSideBarPart.css";
import { NavLink } from "react-router-dom";

import {withRouter} from 'react-router';

const studentsSideBarPart = (props) => {
   return (
      <NavLink className={classes.StudentsSideBarPart} to={props.linkTo}>
         <span className={classes.Left}>{props.left}</span>
         <span className={classes.Right}>{props.right}</span>
      </NavLink>
   );
};

export default withRouter(studentsSideBarPart);
