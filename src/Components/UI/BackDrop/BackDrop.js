import React from 'react';

import classes from './BackDrop.css';

const backDrop = (props) => {
   return <div className={classes.BackDrop} style={{display : props.show ? "block" : "none"}} onClick={props.clicked}></div>
}

export default backDrop;