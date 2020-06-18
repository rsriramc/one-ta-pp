import React from "react";

import classes from "./Student.css";

import Wrap from "../../../hoc/Wrap/Wrap";

import {
   faUserSlash,
   faUser,
   faPlusSquare,
   faMinusSquare,
   faDumpster,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const student = (props) => {
   return (
      <div className={classes.Student}>
         <span className={classes.Name}>{props.name}</span>
         <span className={classes.RollNo}>{props.rollNo}</span>
         <button
            onClick={props.addClick}
            className={props.isAdded ? classes.Minus : classes.Add}
            style={{ display: props.isDereg ? "none" : "inline-block" }}
         >
            {props.isAdded ? (
               <Wrap>
                  <span className={classes.Icon}>
                     <FontAwesomeIcon icon={faMinusSquare} />
                  </span>
                  Remove
               </Wrap>
            ) : (
               <Wrap>
                  <span className={classes.Icon}>
                     <FontAwesomeIcon icon={faPlusSquare} />
                  </span>
                  Add
               </Wrap>
            )}
         </button>
         <button
            onClick={props.deregClick}
            className={props.isDereg ? classes.Join : classes.Remove}
         >
            {props.isDereg ? (
               <Wrap>
                  <span className={classes.Icon}>
                     <FontAwesomeIcon icon={faUser} />
                  </span>
                  Re-Enroll
               </Wrap>
            ) : (
               <Wrap>
                  <span className={classes.Icon}>
                     <FontAwesomeIcon icon={faUserSlash} />
                  </span>
                  De-Register
               </Wrap>
            )}
         </button>
         {props.isDereg ? (
            <button onClick={props.deleteClick} className={classes.Remove}>
               <Wrap>
                  <span className={classes.Icon}>
                     <FontAwesomeIcon icon={faDumpster} />
                  </span>
                  Delete
               </Wrap>
            </button>
         ) : null}
      </div>
   );
};
export default student;
