import React from "react";
import { withRouter } from "react-router-dom";

import classes from "./Subjects.css";
import Logo from "../../Assets/Images/subjects.jpg";

import Spinner from "../../Components/UI/Spinner/Spinner";
import Wrap from "../../hoc/Wrap/Wrap";
import Subject from "../../Components/Subject/Subject";
import StickTop from "../../Components/UI/StickTop/StickTop";
import SideBar from "../../Components/UI/SideBar/SideBar";
import BackDrop from "../../Components/UI/BackDrop/BackDrop";
import InputModal from "../../Components/UI/InputModal/InputModal";
import DefaultText from "../../Components/UI/DefaultText/DefaultText";

import key from "../../Components/UI/keygenerator";

import { faChartBar, /*faClock,*/ faBook } from "@fortawesome/free-solid-svg-icons";

import * as actionTypes from "../../Store/actions/actionTypes";
import * as actions from "../../Store/actions/actionCreators";
import { connect } from "react-redux";
import Alert from "../../Components/UI/Alert/Alert";

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
      alertShow: false,
      alerMessage: null,
      alertButtons: [],
      alertActions: [],
   };

   addSubject = (newSubject) => {
      if (this.state.isTheFormValid) {
         this.props.addSubjectHandler({ ...newSubject });
         this.props.saveLocally();
         this.setState({ isAddingSubject: false });
      }
   };

   isTheNewSubjectValid = (newSubject) => {
      let isValid = true;
      if (newSubject.title.trim().length < 1 && isValid) isValid = !isValid;
      if (newSubject.code.trim().length < 1 && isValid) isValid = !isValid;
      if (newSubject.sem < 0 && isValid) isValid = !isValid;
      this.setState({ isTheFormValid: isValid });
   };

   changeValue = (id, newValue) => {
      let newSubjectsCopy = { ...this.state.newSubjectDetails };
      if (id === "cred1") {
         newSubjectsCopy.credits[0] = newValue;
      } else if (id === "cred2") {
         newSubjectsCopy.credits[1] = newValue;
      } else if (id === "cred3") {
         newSubjectsCopy.credits[2] = newValue;
      } else newSubjectsCopy[id] = newValue;
      this.setState({ newSubjectDetails: newSubjectsCopy });
      this.isTheNewSubjectValid({ ...this.state.newSubjectDetails });
   };

   subjectClickHandler = (code) => {
      this.props.subjects.forEach((value, index) => {
         if (value.code === code) {
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
      let subjects;
      if (this.props.subjects) {
         subjects = this.props.subjects.map((subject) => {
            return (
               <Subject
                  clicked={() => {
                     this.subjectClickHandler(subject.code);
                  }}
                  display={this.state.display[0]}
                  title={subject.title}
                  key={key()}
                  code={subject.code}
                  credits={[...subject.credits]}
                  sem={subject.sem}
                  logo={subject.logo}
               />
            );
         });
      }
      return (
         <Wrap>
            <div className={classes.SideBar}>
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
            </div>
            <div className={classes["Subjects"]}>
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
               {this.props.isAuth !== null &&
               this.props.isAuth !== "own" &&
               this.props.isAuth !== "demo" ? (
                  <button
                     className={classes.Save}
                     onClick={(e) => {
                        e.preventDefault();
                        this.props.savedata();
                     }}
                     disabled={this.props.saved}
                  >
                     {this.props.saved
                        ? "Saved to Cloud"
                        : "Save Data to Cloud"}
                  </button>
               ) : null}
               {this.props.isAuth !== null && this.props.isAuth !== "demo" ? (
                  <p className={classes.Note}>
                     Note : Data will be automatically saved locally.
                  </p>
               ) : (
                  <p className={classes.Note}>
                     Note : This is a demo data changes you make will not be
                     saved.
                  </p>
               )}
               {!this.props.isLoading ? (
                  <div
                     className={
                        classes["SubjectContent" + this.state.display[0]]
                     }
                  >
                     {this.props.subjects.length ? (
                        subjects
                     ) : (
                        <DefaultText>
                           There are no subjects.
                           <br />
                           Click on the +New Button to Add New Subjects.
                        </DefaultText>
                     )}
                  </div>
               ) : (
                  <Spinner />
               )}
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
               submitText="Add New Subject"
               submit={() => {
                  this.addSubject({
                     ...this.state.newSubjectDetails,
                  });
               }}
               changed={this.changeValue}
               inputFields={[
                  {
                     id: "title",
                     label: "Title *",
                     type: "text",
                     size: "Full",
                     value: this.state.newSubjectDetails.title,
                  },
                  {
                     id: "code",
                     label: "Subject Code *",
                     type: "text",
                     size: "Full",
                     value: this.state.newSubjectDetails.code,
                  },
                  {
                     id: "sem",
                     label: "Sem *",
                     type: "number",
                     size: "Full",
                     value: this.state.newSubjectDetails.sem,
                  },
                  {
                     id: "cred1",
                     label: "Credits * : L:",
                     type: "number",
                     size: "Half",
                     value: this.state.newSubjectDetails.credits[0],
                  },
                  {
                     id: "cred2",
                     label: "T :",
                     type: "number",
                     size: "Half",
                     value: this.state.newSubjectDetails.credits[1],
                  },
                  {
                     id: "cred3",
                     label: "P :",
                     type: "number",
                     size: "Half",
                     value: this.state.newSubjectDetails.credits[2],
                  },
               ]}
            />
            <Alert
               show={this.state.alertShow}
               buttons={this.state.alertButtons}
               message={this.state.alerMessage}
               actions={this.state.alertActions}
            >
               Hello
            </Alert>
         </Wrap>
      );
   };
}

const mapStateToProps = (state) => {
   return {
      subjects: state.subjects,
      isAuth: state.token,
      saved: state.hasSaved,
      isLoading: state.isLoadingDataForAuth,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      addSubjectHandler: (newSubject) =>
         dispatch({
            type: actionTypes.ADD_SUBJECT,
            payLoad: { newSubject: newSubject },
         }),
      savedata: () => {
         dispatch(actions.saveData());
      },
      saveLocally: () => {
         dispatch(actions.saveLocally());
      },
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(withRouter(Subjects));
