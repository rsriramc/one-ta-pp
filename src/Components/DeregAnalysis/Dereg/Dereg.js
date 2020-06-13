import React from "react";

import classes from "./Dereg.css";

const dereg = (props) => {
   return (
      <div className={classes.Dereg}>
         <span className={classes.Title}>{props.title}</span>
         <span className={classes.Percent}>{props.percent.toFixed(2)} %</span>
         <div className={classes.MainBar}>
            <div
               className={classes.PercentBar}
               style={{ width: props.percent +'%' }}
            ></div>
         </div>
      </div>
   );
};

export default dereg;
