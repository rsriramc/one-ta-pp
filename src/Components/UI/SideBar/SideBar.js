import React from "react";

import classes from "./SideBar.css";
import SideBarLinks from "./SideBarParts/SideBarLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import key from '../keygenerator';

const sideBar = (props) => {
   const sidebarContent = props.items.map((item) => {
      return (
         <SideBarLinks prefer={item.prefer} link={item.linkTo} key = {key()}>
            {item.icon ? (
               <span className={classes.icons}>
                  <FontAwesomeIcon icon={item.icon} />
               </span>
            ) : null}
            {item.descrip}
         </SideBarLinks>
      );
   });
   return (
      <div className={classes["SideBar" + props.place]}>
         {sidebarContent}
      </div>
   );
};

export default sideBar;
