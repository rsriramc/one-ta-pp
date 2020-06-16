import React from "react";

import classes from './Subject.css';

const subject = (props) => {
   /*
      Planning of props:
         1. title
         2. credits
         3. subtype for logo
         4. semester of the course
   */
   const styleType = props.display;
   return (
      <div
         className={classes["Subject" + styleType]}
         onClick={() => {
            props.clicked();
         }}
      >
         <div
            className={classes["Img" + styleType]}
            style={{ backgroundImage: "url(" + props.logo + ")" }}
         ></div>
         <div className={classes["Info" + styleType]}>
            <span className={classes["Code" + styleType]}>{props.code}</span>
            {props.title} <br className={classes["br" + styleType]} />
            Semester : {props.sem} <br />
            L-T-P : [{props.credits.join(" , ")}]
         </div>
      </div>
   );
};

export default subject;
