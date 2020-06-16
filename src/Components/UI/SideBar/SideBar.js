import React from "react";

import classes from "./SideBar.css";
import SideBarLinks from "./SideBarParts/SideBarLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faClock, faBook } from "@fortawesome/free-solid-svg-icons";

const sideBar = (props) => {
   return (
      <div className={classes["SideBar" + props.place]}>
         <SideBarLinks link="/subjects">
            <span className={classes.icons}>
               <FontAwesomeIcon icon={faBook} />
            </span>
            Subjects
         </SideBarLinks>
         <SideBarLinks link="/deregAnalysis">
            <span className={classes.icons}>
               <FontAwesomeIcon icon={faChartBar} />
            </span>
            Dereg.. Analysis
         </SideBarLinks>
         <SideBarLinks link="/recent">
            <span className={classes.icons}>
               <FontAwesomeIcon icon={faClock} />
            </span>
            Recent
         </SideBarLinks>
      </div>
   );
};

export default sideBar;
