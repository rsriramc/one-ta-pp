import React from "react";

import classes from "./Alert.css";
// import BackDrop from "../BackDrop/BackDrop";

const alert = (props) => {
   return (
      <div className={classes["Alert" + (props.show ? "Show" : "Hide")]}>
         {props.message}
         <div className={classes.ButtonsArray}>
            {props.buttons.map((button, index) => {
               return (
                  <button
                     key={index}
                     className={classes.Button}
                     onClick={props.actions[index]}
                  >
                     {button}
                  </button>
               );
            })}
         </div>
      </div>
   );
};

export default alert;
