import React from "react";

import classes from "./DeregAnalysis.css";
import Wrap from "../../hoc/Wrap/Wrap";
import SideBar from "../UI/SideBar/SideBar";
import StickTop from "../UI/StickTop/StickTop";
import DefaultText from "../UI/DefaultText/DefaultText";

import deregAna from "../../Assets/Images/deregAnalysis2.jpg";

import { faChartBar, /*faClock,*/ faBook } from "@fortawesome/free-solid-svg-icons";

import Dereg from "./Dereg/Dereg";
import { connect } from "react-redux";

const deregAnalysis = (props) => {
   const deregBars = [];
   props.subjects.forEach((subject, index) => {
      const numStudents = subject.students.length;
      let deregStudents = 0;
      subject.students.forEach((student, index2) => {
         if (student.isDereg) deregStudents++;
      });
      deregBars.push(
         <Dereg
            key={subject.code}
            title={subject.title + " " + subject.code}
            percent={(deregStudents / numStudents) * 100}
         ></Dereg>
      );
   });
   return (
      <Wrap>
         <SideBar
            place="Subjects"
            items={[
               {
                  linkTo: "/subjects",
                  descrip: "Subjects",
                  icon: faBook,
                  prefer: "Main",
               },
               {
                  linkTo: "/deregAnalysis",
                  descrip: "Dereg.. Analysis",
                  icon: faChartBar,
                  prefer: "Main",
               },
            ]}
         />
         <div className={classes.DeregAnalysis}>
            <StickTop top={64} stickat={-80} height={150} bg={deregAna}>
               De-Registration Analysis
            </StickTop>
            {props.subjects.length ? (
               deregBars
            ) : (
               <DefaultText>
                  There are no subjects.
                  <br />
                  Go to subejcts and Click on the +New Button to Add New
                  Subjects.
               </DefaultText>
            )}
         </div>
      </Wrap>
   );
};

const mapStateToProps = (state) => {
   return {
      subjects: state.subjects,
   };
};

export default connect(mapStateToProps, null)(deregAnalysis);
