import React from "react";

import classes from "./InputModal.css";

const inputModal = (props) => {
   let inputs = null;
   if (props.inputFields.length > 0)
      inputs = props.inputFields.map((inputField) => {
         return (
            <div
               key={inputField.id}
               className={classes["Div" + inputField.size]}
            >
               <label className={classes["Label" + inputField.size]}>
                  {inputField.label}
               </label>
               <input
                  className={classes["Input" + inputField.size]}
                  type={inputField.type}
                  value={inputField.value}
                  onChange={(e) => {
                     props.changed(inputField.id, e.target.value);
                  }}
               />
            </div>
         );
      });
   return (
      <div
         className={classes.Wrapper}
         style={{ display: props.show ? "flex" : "none" }}
      >
         <div className={classes.FormContainer}>
            <form>
               {inputs}
               <button
                  className={classes.Submit}
                  onClick={(e) => {
                     e.preventDefault();
                     props.submit();
                  }}
               >{props.submitText}</button>
            </form>
         </div>
      </div>
   );
};

export default inputModal;
