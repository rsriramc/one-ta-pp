import React from "react";

import "./App.css";

import Wrap from "./hoc/Wrap/Wrap";
import Content from "./Components/Content/Content";

import Algo from './Assets/Images/algo.png';
import DAnaly from './Assets/Images/dataAnalysis.png';
import DeviceMan from './Assets/Images/devicemanagement.png';
import SoftEng from './Assets/Images/software.jpg';
import CompArch from './Assets/Images/comparch.jpg';
import GeneralImg from './Assets/Images/default.jpg';
import CompNetwork from "./Assets/Images/network.png";

import Subjects from "./Containers/Subjects/Subjects";
import Students from "./Components/Students/Students";
import DeregAnalysis from "./Components/DeregAnalysis/DeregAnalysis";

import { Route, Switch } from "react-router-dom";
import Home from "./Containers/Home/Home";
import PageNotFound from "./Components/UI/PageNotFound/PageNotFound";

// import axios from "axios";

class App extends React.Component {
   state = {
      numSubjects: 6,
      recent: [],
      subjects: [
         {
            title: "Algorithms",
            code: "CS20012",
            logo: Algo,
            credits: [3, 2, 0],
            sem: 3,
            students: [
               {
                  name: "algo1-1",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "algo1-2",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "algo1-3",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "algo1-4",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "algo1-5",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "algo1-6",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
            ],
         },
         {
            title: "Data Analysis",
            code: "CS30001",
            logo : DAnaly,
            credits: [4, 1, 0],
            sem: 6,
            students: [
               {
                  name: "algo2-1",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "algo2-2",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "algo2-3",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "algo2-4",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "algo2-5",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "algo2-6",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
            ],
         },
         {
            title: "Device Management",
            code: "CS30048",
            logo: DeviceMan,
            credits: [3, 1, 2],
            sem: 6,
            students: [
               {
                  name: "nt1-1",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "nt1-2",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "nt1-3",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "nt1-4",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "nt1-5",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "nt1-6",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
            ],
         },
         {
            title: "Software Engineering",
            code: "CS30096",
            logo: SoftEng,
            credits: [3, 1, 2],
            sem: 6,
            students: [
               {
                  name: "nt2-1",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "nt2-2",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "nt2-3",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "nt2-4",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "nt2-5",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "nt2-6",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
            ],
         },
         {
            title: "Computer Architecture",
            code: "CS30045",
            logo : CompArch,
            credits: [3, 1, 2],
            sem: 6,
            students: [
               {
                  name: "nt3-1",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "nt3-2",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "nt3-3",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "nt3-4",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "nt3-5",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "nt3-6",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
            ],
         },
         {
            title: "Network Theory",
            code: "CS30012",
            logo : CompNetwork,
            credits: [3, 1, 2],
            sem: 6,
            students: [
               {
                  name: "nt4-1",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "nt4-2",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "nt4-3",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "nt4-4",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "nt4-5",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
               {
                  name: "nt4-6",
                  rollNo: "19CS30038",
                  isDereg: false,
                  isAdded: false,
               },
            ],
         },
      ],
   };

   studentDeregHandler = (code, name) => {
      const subjectsCopy = this.state.subjects.map((subject) => {
         return {
            ...subject,
            credits: [...subject.credits],
            students: subject.students.map((student) => {
               return {
                  ...student,
               };
            }),
         };
      });
      this.state.subjects.forEach((subject, index) => {
         if (code === subject.code)
            subject.students.forEach((student, index2) => {
               if (student.name === name) {
                  subjectsCopy[index].students[index2].isDereg = !subjectsCopy[
                     index
                  ].students[index2].isDereg;

                  subjectsCopy[index].students[index2].isAdded =
                     subjectsCopy[index].students[index2].isAdded &&
                     subjectsCopy[index].students[index2].isDereg;
                  this.setState({ subjects: subjectsCopy });
               }
            });
      });
   };

   studentAddHandler = (code, name) => {
      const subjectsCopy = this.state.subjects.map((subject) => {
         return {
            ...subject,
            credits: [...subject.credits],
            students: subject.students.map((student) => {
               return {
                  ...student,
               };
            }),
         };
      });
      subjectsCopy.forEach((subject, index) => {
         if (code === subject.code)
            subject.students.forEach((student, index2) => {
               if (student.name === name) {
                  subjectsCopy[index].students[index2].isAdded = !subjectsCopy[
                     index
                  ].students[index2].isAdded;
                  console.log("changing");

                  this.setState({ subjects: subjectsCopy });
               }
            });
      });
   };

   addAllStudents = (code) => {
      const subjectsCopy = this.state.subjects.map((subject) => {
         return {
            ...subject,
            credits: [...subject.credits],
            students: subject.students.map((student) => {
               return {
                  ...student,
               };
            }),
         };
      });
      subjectsCopy.forEach((subject, index) => {
         if (code === subject.code)
            subject.students.forEach((student, index2) => {
               subjectsCopy[index].students[index2].isAdded = true;
               console.log("changing");
            });
         this.setState({ subjects: subjectsCopy });
      });
   };

   minusAllStudents = (code) => {
      const subjectsCopy = this.state.subjects.map((subject) => {
         return {
            ...subject,
            credits: [...subject.credits],
            students: subject.students.map((student) => {
               return {
                  ...student,
               };
            }),
         };
      });
      subjectsCopy.forEach((subject, index) => {
         if (code === subject.code)
            subject.students.forEach((student, index2) => {
               subjectsCopy[index].students[index2].isAdded = false;
               console.log("changing");
            });
         this.setState({ subjects: subjectsCopy });
      });
   };

   addSubjectHandler = (newSubject) => {
      const subjectsCopy = this.state.subjects.map((subject) => {
         return {
            ...subject,
            credits: [...subject.credits],
            students: subject.students.map((student) => {
               return {
                  ...student,
               };
            }),
         };
      });
      subjectsCopy.push({ ...newSubject, logo:GeneralImg, students: [] });
      this.setState({ subjects: subjectsCopy });
   };

   newStudentHandler = (code, newStudent) => {
      const subjectsCopy = this.state.subjects.map((subject) => {
         return {
            ...subject,
            credits: [...subject.credits],
            students: subject.students.map((student) => {
               return {
                  ...student,
               };
            }),
         };
      });
      subjectsCopy.forEach((subject, index) => {
         if (code === subject.code) {
            subject.students.push({
               name: newStudent.name,
               rollNo: newStudent.rollNo,
               isAdded: false,
               isDereg: false,
            });
         }
      });
      this.setState({ subjects: subjectsCopy });
   };

   render = () => {
      const subjectsCopy = this.state.subjects.map((subject) => {
         return {
            ...subject,
            credits: [...subject.credits],
            students: subject.students.map((student) => {
               return {
                  ...student,
               };
            }),
         };
      });
      return (
         <Wrap>
            <Content>
               <Switch>
                  {/* <Subjects/> */}
                  <Route path="/" exact render={() => <Home />} />
                  <Route
                     path="/subjects"
                     exact
                     render={() => (
                        <Subjects
                           subjects={subjectsCopy}
                           recent={[...this.state.recent]}
                           addSubject={this.addSubjectHandler}
                        />
                     )}
                  />
                  <Route
                     path="/deregAnalysis"
                     render={() => <DeregAnalysis subjects={subjectsCopy} />}
                  />
                  <Route
                     path="/subjects/:code"
                     render={() => (
                        <Students
                           subjects={subjectsCopy}
                           studentDereg={this.studentDeregHandler}
                           studentAdd={this.studentAddHandler}
                           addAllStudents={this.addAllStudents}
                           minusAllStudents={this.minusAllStudents}
                           newStudent={this.newStudentHandler}
                        />
                     )}
                  />
                  <Route
                     render={() => (
                        <PageNotFound/>
                     )}
                  />
               </Switch>
            </Content>
         </Wrap>
      );
   };
}

export default App;
