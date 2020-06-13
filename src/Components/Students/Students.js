import React from "react";

import classes from "./Students.css";
import StickTop from "../UI/StickTop/StickTop";
import Wrap from "../../hoc/Wrap/Wrap";
import SideBar from '../UI/SideBar/SideBar';

import { withRouter } from "react-router-dom";

import Student from "./Student/Student";

const students = (props) => {
   const studentsActiveList = [];
   const studentsDeregList = [];
   props.subjects[props.match.params.id].students.forEach((student) => {
      if (!student.isDereg)
         studentsActiveList.push(
            <Student
               key={student.name}
               name={student.name}
               rollNo={student.rollNo}
               isDereg={student.isDereg}
               isAdded={student.isAdded}
               clicked={() =>
                  props.studentClick(
                     props.subjects[props.match.params.id].code,
                     student.name
                  )
               }
            />
         );
      else if (student.isDereg)
         studentsDeregList.push(
            <Student
               key={student.name}
               name={student.name}
               rollNo={student.rollNo}
               isDereg={student.isDereg}
               isAdded={student.isAdded}
               clicked={() =>
                  props.studentClick(
                     props.subjects[props.match.params.id].code,
                     student.name
                  )
               }
            />
         );
   });
   console.log(props);
   return (
      <Wrap>
         <div
            className={classes.SideBar}
            style={{
               position: "fixed",
               top: "70px",
               left: "5px",
               width: "19%",
               height: "100vh",
               float: "left",
            }}
            // onClick={() => props.changeDisplayStyle()}
         >
            {/* Links<br/>
               Deregistation Analysis<br />
            Recent */}
            <SideBar/>
         </div>
         <div className={classes.Students}>
            <StickTop top={64} stickat={-80} height={150}>
               Students
            </StickTop>
            {studentsActiveList}
            <br />
            Deregestired Students:
            <br />
            {studentsDeregList}
         </div>
      </Wrap>
   );
};

export default withRouter(students);
