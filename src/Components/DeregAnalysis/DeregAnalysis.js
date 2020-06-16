import React from "react";

import classes from "./DeregAnalysis.css";
import Wrap from "../../hoc/Wrap/Wrap";
import SideBar from "../UI/SideBar/SideBar";
import StickTop from '../UI/StickTop/StickTop';

import deregAna from '../../Assets/Images/deregAnalysis2.jpg';

import Dereg from './Dereg/Dereg';

const deregAnalysis = (props) => {
   const deregBars = [];
   props.subjects.forEach(
      (subject, index) => {
         const numStudents = subject.students.length;
         let deregStudents = 0;
         subject.students.forEach(
            (student, index2) => {
               if (student.isDereg)
                  deregStudents++;
            }
         );
         deregBars.push(<Dereg key={subject.code} title={subject.title + " " + subject.code} percent={deregStudents/numStudents * 100}></Dereg>)
      }
   );
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
            <SideBar />
         </div>
         <div className={classes.DeregAnalysis}>
            <StickTop top={64} stickat={-80} height={150} bg={deregAna}>
               De-Registration Analysis
            </StickTop>
            {deregBars}
         </div>
      </Wrap>
   );
};

export default deregAnalysis;
