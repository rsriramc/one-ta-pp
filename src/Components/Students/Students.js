import React from "react";

import classes from "./Students.css";
import StickTop from "../UI/StickTop/StickTop";
import Wrap from "../../hoc/Wrap/Wrap";
import StudentsSideBar from "./StudentsSideBar/StudentsSideBar";

import { withRouter } from "react-router-dom";

import Student from "./Student/Student";
import BackDrop from "../UI/BackDrop/BackDrop";
import InputModal from "../UI/InputModal/InputModal";
import DefaultText from "../UI/DefaultText/DefaultText";
import PageNotFound from '../UI/PageNotFound/PageNotFound';

class Students extends React.Component {
   state = {
      presentSubjectIndex: null,
      isAddingStudent: false,
      newStudentDetails: {
         name: "",
         rollNo: "",
      },
      isTheFormValid: false,
   };

   componentWillMount = () => {
      let subjectIndex = null;
      this.props.subjects.forEach((subject, index) => {
         if (subject.code === this.props.match.params.code) {
            subjectIndex = index;
            if (
               this.state.presentSubjectIndex === null ||
               (this.state.presentSubjectIndex &&
                  this.state.presentSubjectIndex !== subjectIndex)
            )
               this.setState({ presentSubjectIndex: subjectIndex });
         }
      });
   }

   componentDidUpdate=()=> {
      let subjectIndex = null;
      this.props.subjects.forEach((subject, index) => {
         if (subject.code === this.props.match.params.code) {
            subjectIndex = index;
            if (
               this.state.presentSubjectIndex === null ||
               (this.state.presentSubjectIndex !== null &&
                  this.state.presentSubjectIndex !== subjectIndex)
            ) {
               this.setState({ presentSubjectIndex: subjectIndex });
            }
         }
      });
   }

   newStudent = (newStudent) => {
      if (this.state.isTheFormValid) {
         console.log(newStudent);
         this.props.newStudent(
            this.props.subjects[this.state.presentSubjectIndex].code,
            {
               ...newStudent,
            }
         );
         this.setState({
            isAddingStudent: false,
            newStudentDetails: { name: "", rollNo: "" },
            isTheFormValid: false,
         });
      }
   };

   isTheNewStudentValid = (newStudent) => {
      let isValid = true;
      if (newStudent.name.trim().length < 4 && isValid) isValid = !isValid;
      if (newStudent.rollNo.trim().length < 4 && isValid) isValid = !isValid;
      this.setState({ isTheFormValid: isValid });
   };

   changeValue = (id, newValue) => {
      let newStudentCopy = { ...this.state.newStudentDetails };
      newStudentCopy[id] = newValue;
      this.setState({ newStudentDetails: newStudentCopy });
      this.isTheNewStudentValid({ ...this.state.newStudentDetails });
   };

   render() {
      let removeAllButton = true;
      let addAllButton = true;
      let studentsAddedList = [];
      let studentsNotAddedList = [];
      let studentsDeregList = [];
      if (this.state.presentSubjectIndex === null) {
         return <PageNotFound />;
      }
      this.props.subjects[this.state.presentSubjectIndex].students.forEach(
         (student) => {
            if (!student.isDereg) {
               if (student.isAdded) {
                  studentsAddedList.push(
                     <Student
                        key={student.name}
                        name={student.name}
                        rollNo={student.rollNo}
                        isDereg={student.isDereg}
                        isAdded={student.isAdded}
                        deregClick={() =>
                           this.props.studentDereg(
                              this.props.subjects[
                                 this.state.presentSubjectIndex
                              ].code,
                              student.name
                           )
                        }
                        addClick={() =>
                           this.props.studentAdd(
                              this.props.subjects[
                                 this.state.presentSubjectIndex
                              ].code,
                              student.name
                           )
                        }
                     />
                  );
               }
               if (!student.isAdded) {
                  studentsNotAddedList.push(
                     <Student
                        key={student.name}
                        name={student.name}
                        rollNo={student.rollNo}
                        isDereg={student.isDereg}
                        isAdded={student.isAdded}
                        deregClick={() =>
                           this.props.studentDereg(
                              this.props.subjects[
                                 this.state.presentSubjectIndex
                              ].code,
                              student.name
                           )
                        }
                        addClick={() =>
                           this.props.studentAdd(
                              this.props.subjects[
                                 this.state.presentSubjectIndex
                              ].code,
                              student.name
                           )
                        }
                     />
                  );
               }
            } else if (student.isDereg)
               studentsDeregList.push(
                  <Student
                     key={student.name}
                     name={student.name}
                     rollNo={student.rollNo}
                     isDereg={student.isDereg}
                     isAdded={student.isAdded}
                     deregClick={() =>
                        this.props.studentDereg(
                           this.props.subjects[this.state.presentSubjectIndex]
                              .code,
                           student.name
                        )
                     }
                     addClick={() =>
                        this.props.studentAdd(
                           this.props.subjects[this.state.presentSubjectIndex]
                              .code,
                           student.name
                        )
                     }
                  />
               );
         }
      );

      if (studentsNotAddedList.length <= 0) {
         removeAllButton = false;
         studentsNotAddedList = (
            <div className={classes.Nil}>
               All students has been added to the platform.
            </div>
         );
      }
      if (studentsDeregList.length <= 0) {
         studentsDeregList = (
            <div className={classes.Nil}>
               No students have been de-registered.
            </div>
         );
      }
      if (studentsAddedList.length <= 0) {
         addAllButton = false;
         studentsAddedList = (
            <div className={classes.Nil}>
               No students have been added to the platform.
            </div>
         );
      }
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
            >
               <StudentsSideBar subjects={this.props.subjects} />
            </div>

            <div className={classes.Students}>
               <StickTop
                  bg={this.props.subjects[this.state.presentSubjectIndex].logo}
                  top={64}
                  stickat={-80}
                  height={150}
               >
                  Students <br />
                  {this.props.subjects[this.state.presentSubjectIndex].title +
                     " (" +
                     this.props.subjects[this.state.presentSubjectIndex].code +
                     ")"}
               </StickTop>
               <br />
               {this.props.subjects[this.state.presentSubjectIndex].students
                  .length ? (
                  <Wrap>
                     Added Students:
                     <button
                        disabled={!addAllButton}
                        onClick={() => {
                           this.props.minusAllStudents(
                              this.props.subjects[
                                 this.state.presentSubjectIndex
                              ].code
                           );
                        }}
                        className={classes.MinusAll}
                     >
                        Remove All The Added Participants
                     </button>
                     {studentsAddedList}
                     <br />
                     Not Added Students:
                     <button
                        disabled={!removeAllButton}
                        onClick={() => {
                           this.props.addAllStudents(
                              this.props.subjects[
                                 this.state.presentSubjectIndex
                              ].code
                           );
                        }}
                        className={classes.AddAll}
                     >
                        Add All The Below Participants
                     </button>
                     {studentsNotAddedList}
                     <br />
                     De-Registered Students:
                     {studentsDeregList}
                  </Wrap>
               ) : (
                  <DefaultText>
                     There are no students registered in this subject.
                     <br />
                     Click on the +New Button to Add New Students.
                  </DefaultText>
               )}
            </div>

            <div
               className={classes.AddNew}
               onClick={() => {
                  this.setState((prevState) => {
                     return { isAddingStudent: !prevState.isAddingStudent };
                  });
               }}
            >
               + New
            </div>
            <BackDrop
               show={this.state.isAddingStudent}
               clicked={() => {
                  this.setState((prevState) => {
                     return { isAddingStudent: !prevState.isAddingStudent };
                  });
               }}
            />
            <InputModal
               show={this.state.isAddingStudent}
               submit={() => {
                  this.newStudent({
                     ...this.state.newStudentDetails,
                  });
               }}
               changed={this.changeValue}
               submitText="Add New Student"
               inputFields={[
                  {
                     id: "name",
                     label: "Name",
                     type: "text",
                     value: this.state.newStudentDetails.name,
                  },
                  {
                     id: "rollNo",
                     label: "Roll No",
                     type: "text",
                     value: this.state.newStudentDetails.rollNo,
                  },
               ]}
            />
         </Wrap>
      );
   }
}

export default withRouter(Students);
