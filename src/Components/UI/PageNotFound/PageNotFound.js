import React from "react";

import classes from "./PageNotFound.css";
import { NavLink } from "react-router-dom";

const pageNotFound = (prosp) => {
   return (
      <div className={classes.PageNotFound}>
         <h1>Page Not Found</h1>
         <p>Use the following links to get the work back on track.</p>
         <nav>
            <NavLink to="/">Home</NavLink>
         </nav>
      </div>
   );
};

export default pageNotFound;
