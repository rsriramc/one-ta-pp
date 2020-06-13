import React from "react";

import Wrap from "../../hoc/Wrap/Wrap";
import { NavLink } from "react-router-dom";

const content = (props) => {
   return (
      <Wrap>
         <div
            style={{
               border: "2px solid black",
               height: "64px",
               lineHeight: "60px",
               padding: "0 25px",
               position: "fixed",
               top: "0",
               left: "0",
               width: " 100%",
               zIndex: "20",
               boxSizing: "border-box",
               backgroundColor: "#fff",
            }}
         >
            Here goes the navigation bar component.
            <NavLink
               to="/"
               exact
               activeStyle={{ backgroundColor: "cyan" }}
            >Subjects</NavLink>
         </div>
         {props.children}
      </Wrap>
   );
};

export default content;
