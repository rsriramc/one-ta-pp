import React from "react";

import classes from "./Students.css";
import StickTop from "../../Components/UI/StickTop/StickTop";
import Wrap from "../../hoc/Wrap/Wrap";
import StudentsSideBar from "../../Components/Students/StudentsSideBar/StudentsSideBar";

import { withRouter } from "react-router-dom";

import Student from "../../Components/Students/Student/Student";
import BackDrop from "../../Components/UI/BackDrop/BackDrop";
import InputModal from "../../Components/UI/InputModal/InputModal";
import DefaultText from "../../Components/UI/DefaultText/DefaultText";
import PageNotFound from "../../Components/UI/PageNotFound/PageNotFound";

import key from '../../Components/UI/keygenerator';

import * as actionTypes from "../../Store/actions/actionTypes";
import { connect } from "react-redux";

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

   detectIndex = () => {
      let subjectIndex = null;
      this.props.subjects.forEach((subject, index) => {
         if (subject.code === this.props.match.params.code) {
            subjectIndex = index;
            if (
               this.state.presentSubjectIndex === null ||
               (this.state.presentSubjectIndex !== null &&
                  this.state.presentSubjectIndex !== subjectIndex)
            )
               this.setState({ presentSubjectIndex: subjectIndex });
         }
      });
   };

   componentWillMount = () => {
      this.detectIndex();
   };

   componentDidUpdate = () => {
      this.detectIndex();
   };

   newStudent = (newStudent) => {
      if (this.state.isTheFormValid) {
         this.props.newStudentHandler(
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

   deleteSubject = (code) => {
      console.log("deleting");
      this.props.history.push('/subjects/');
      this.props.deleteSubjectHandler(code);
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
         (student, index) => {
            let studentJSX = (
               <Student
                  key={key()}
                  name={student.name}
                  rollNo={student.rollNo}
                  isDereg={student.isDereg}
                  isAdded={student.isAdded}
                  deregClick={() =>
                     this.props.studentDeregHandler(
                        this.props.subjects[this.state.presentSubjectIndex]
                           .code,
                        student.name
                     )
                  }
                  addClick={() =>
                     this.props.studentAddHandler(
                        this.props.subjects[this.state.presentSubjectIndex]
                           .code,
                        student.name
                     )
                  }
                  deleteClick={() =>
                     this.props.deleteStudentHandler(
                        this.props.subjects[this.state.presentSubjectIndex]
                           .code,
                        student.name
                     )
                  }
               />
            );
            if (!student.isDereg) {
               if (student.isAdded) studentsAddedList.push(studentJSX);
               else if (!student.isAdded) studentsNotAddedList.push(studentJSX);
            } else if (student.isDereg) studentsDeregList.push(studentJSX);
         }
      );

      if (studentsNotAddedList.length <= 0) {
         removeAllButton = false;
         if (
            this.props.subjects[this.state.presentSubjectIndex].students
               .length === studentsDeregList.length
         )
            studentsNotAddedList = (
               <div className={classes.Nil}>
                  All students has been de-registered.
               </div>
            );
         else
            studentsNotAddedList = (
               <div className={classes.Nil}>
                  All the Registered students has been been added to the
                  platform.
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
                  deletable
                  deletableItem="Subject"
                  deleteClick={() =>
                     this.deleteSubject(
                        this.props.subjects[this.state.presentSubjectIndex].code
                     )
                  }
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

const mapStateToProps = (state) => {
   return {
      subjects: state.subjects,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      studentAddHandler: (code, name) =>
         dispatch({
            type: actionTypes.ADD_STUDENT,
            payLoad: { code: code, name: name },
         }),
      studentDeregHandler: (code, name) =>
         dispatch({
            type: actionTypes.DEREG_STUDENT,
            payLoad: { code: code, name: name },
         }),
      addAllStudents: (code) =>
         dispatch({
            type: actionTypes.ADD_ALL_STUDENTS,
            payLoad: { code: code },
         }),
      minusAllStudents: (code) =>
         dispatch({
            type: actionTypes.MINUS_ALL_STUDENTS,
            payLoad: { code: code },
         }),
      newStudentHandler: (code, newStudent) =>
         dispatch({
            type: actionTypes.ADD_NEW_STUDENT,
            payLoad: { code: code, newStudent: newStudent },
         }),
      deleteStudentHandler: (code, name) =>
         dispatch({
            type: actionTypes.DELETE_STUDENT,
            payLoad: { code: code, name: name },
         }),
      deleteSubjectHandler: (code) =>
         dispatch({
            type: actionTypes.DELETE_SUBJECT,
            payLoad: { code: code},
         }),
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(withRouter(Students));
