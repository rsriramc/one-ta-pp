import React from "react";

import classes from "./StickTop.css";

const stickTop = (props) => {
   return (
      <div
         className={classes.StickTop}
         style={{
            backgroundImage:
               "linear-gradient(to right bottom,rgba(255, 255, 255, 0.500),rgba(216, 216, 216, 0.513)), url(" +
               props.bg +
               ")",
            backgroundSize: 'cover',
            backgroundPosition: '40% 50%',
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
            {props.displayChange ? (
               <div className={classes.StyleChange}>
                  {props.view}
                  <div
                     className={classes.DisplayStyle}
                     onClick={props.changeStyle}
                  >
                     <div className={classes["Inside" + props.view]}></div>
                     <div className={classes["Inside" + props.view]}></div>
                     <div className={classes["Inside" + props.view]}></div>
                     <div className={classes["Inside" + props.view]}></div>
                  </div>
               </div>
            ) : null}
         </div>
      </div>
   );
};

export default stickTop;
