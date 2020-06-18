import React from "react";

import classes from "./StudentsSideBar.css";
import StudentsSideBarPart from "./StudentsSidebarPart/StudentsSideBarPart";
import { withRouter } from "react-router";

const studentsSideBar = (props) => {
   let subjectsList = [];
   subjectsList = props.subjects.map((subject) => {
      return (
         <StudentsSideBarPart
            key={subject.code}
            linkTo={"/subjects/" + subject.code}
            left={subject.title}
            right={subject.code}
         >
         </StudentsSideBarPart>
      );
   });
   return <div className={classes.StudentsSideBar}><h2>Subjects:</h2>{subjectsList}</div>;
};

export default withRouter(studentsSideBar);
