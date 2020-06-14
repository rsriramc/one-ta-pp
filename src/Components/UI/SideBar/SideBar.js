import React from 'react';

import classes from './SideBar.css';
import SideBarLinks from './SideBarParts/SideBarLinks';

const sideBar = (props) => {
   return (
      <div className={classes["SideBar" + props.place]}>
         <SideBarLinks link="/subjects">Subjects</SideBarLinks>
         <SideBarLinks link="/deregAnalysis">Dereg.. Analysis</SideBarLinks>
         <SideBarLinks link="/recent">Recent</SideBarLinks>
      </div>
   );
}

export default sideBar;