import React from "react";

import classes from "./StickTop.css";

const stickTop = (props) => {
   return (
      <div
         className={classes.StickTop}
         style={{
            top: -props.height + props.top + "px",
            marginTop: props.top + "px",
            paddingTop: props.height + "px",
         }}
      >
         <div
            className={classes.Content}
            // style={{ marginTop: props.height + "px" }}
         >
            {props.children}
            <div className={classes.DisplayStyle} onClick={props.changeStyle}>
               <div className={classes.Inside}></div>
               <div className={classes.Inside}></div>
               <div className={classes.Inside}></div>
               <div className={classes.Inside}></div>
            </div>
         </div>
      </div>
   );
};

export default stickTop;
