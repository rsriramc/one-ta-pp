import React from 'react';

import classes from './Student.css';

const student = (props) => {
   return (
      <div className={classes.Student} onClick={props.clicked}>
         <span className={classes.Name}>{props.name}</span>
         <span className={classes.RollNo}>{props.rollNo}</span>
         {/* <span className={classes.Name}>{props.name}</span> */}
      </div>
   );
}
export default student;