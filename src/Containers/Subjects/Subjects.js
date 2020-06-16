import React from "react";
import { withRouter } from "react-router-dom";

import classes from "./Subjects.css";
import Logo from '../../Assets/Images/subjects.jpg';

import Wrap from "../../hoc/Wrap/Wrap";
import Subject from "../../Components/Subject/Subject";
import StickTop from "../../Components/UI/StickTop/StickTop";
import SideBar from "../../Components/UI/SideBar/SideBar";
import BackDrop from "../../Components/UI/BackDrop/BackDrop";
import InputModal from "../../Components/UI/InputModal/InputModal";

class Subjects extends React.Component {
   state = {
      display: ["Blocks", "Tiles", "List"],
      isAddingSubject: false,
      newSubjectDetails: {
         title: "",
         code: "",
         credits: [0, 0, 0],
         sem: "",
      },
      isTheFormValid: false,
   };

   addSubject = (newSubject) => {
      if (this.state.isTheFormValid) {
         this.props.addSubject({ ...newSubject });
         this.setState({ isAddingSubject: false });
      }
   };

   isTheNewSubjectValid = (newSubject) => {
      let isValid = true;
      if (newSubject.title.trim().length < 4 && isValid) isValid = !isValid;
      if (newSubject.code.trim().length < 7 && isValid) isValid = !isValid;
      if (newSubject.sem < 0 && isValid) isValid = !isValid;
      this.setState({ isTheFormValid: isValid });
   };

   changeValue = (id, newValue) => {
      let newSubjectsCopy = { ...this.state.newSubjectDetails };
      newSubjectsCopy[id] = newValue;
      this.setState({ newSubjectDetails: newSubjectsCopy });
      this.isTheNewSubjectValid({...this.state.newSubjectDetails});
   };

   subjectClickHandler = (key) => {
      this.props.subjects.forEach((value, index) => {
         if (value.code === key) {
            this.props.history.push("/subjects/" + value.code);
         }
      });
   };

   changeDisplayStyle = () => {
      const stateCopy = [...this.state.display];
      const presentStyle = stateCopy[0];
      stateCopy.splice(0, 1);
      stateCopy.push(presentStyle);
      this.setState({ display: stateCopy });
   };

   render = () => {
      const subjects = this.props.subjects.map((subject) => {
         return (
            <Subject
               clicked={() => {
                  this.subjectClickHandler(subject.code);
               }}
               display={this.state.display[0]}
               title={subject.title}
               key={subject.code}
               code={subject.code}
               credits={[...subject.credits]}
               sem={subject.sem}
               logo={subject.logo}
            />
         );
      });
      return (
         <Wrap>
            <div className={classes.SideBar}>
               <SideBar place="Subjects" />
            </div>
            <div className={classes.Subjects}>
               <StickTop
                  bg={Logo}
                  view={this.state.display[0]}
                  displayChange
                  top={64}
                  height={150}
                  changeStyle={() => this.changeDisplayStyle()}
               >
                  Subjects
               </StickTop>
               <div className={classes.SubjectContent}>{subjects}</div>
               <div
                  className={classes.AddNew}
                  onClick={() => {
                     this.setState((prevState) => {
                        return { isAddingSubject: !prevState.isAddingSubject };
                     });
                  }}
               >
                  + New
               </div>
            </div>
            <BackDrop
               show={this.state.isAddingSubject}
               clicked={() => {
                  this.setState((prevState) => {
                     return { isAddingSubject: !prevState.isAddingSubject };
                  });
               }}
            />
            <InputModal
               show={this.state.isAddingSubject}
               submitText = "Add New Subject"
               submit={() => {
                  this.addSubject({
                     ...this.state.newSubjectDetails,
                  });
               }}
               changed={this.changeValue}
               inputFields={[
                  {
                     id: "title",
                     label: "Title",
                     type: "text",
                     value: this.state.newSubjectDetails.title,
                  },
                  {
                     id: "code",
                     label: "Subject Code",
                     type: "text",
                     value: this.state.newSubjectDetails.code,
                  },
                  {
                     id: "sem",
                     label: "Sem",
                     type: "number",
                     value: this.state.newSubjectDetails.sem,
                  },
               ]}
            />
         </Wrap>
      );
   };
}

export default withRouter(Subjects);
