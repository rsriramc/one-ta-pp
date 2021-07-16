import * as actionTypes from "./actions/actionTypes.js";
import * as images from "../Assets/Images/Images";

const demoSubjects = [
   {
      title: "Algorithms",
      code: "CS20012",
      logo: images.Algo,
      credits: [3, 2, 0],
      sem: 3,
      students: [],
   },
   {
      title: "Algorithms II",
      code: "CS30001",
      logo: images.DataAnaly,
      credits: [4, 1, 0],
      sem: 6,
      students: [],
   },
   {
      title: "Device Management",
      code: "CS30048",
      logo: images.DevMng,
      credits: [3, 1, 2],
      sem: 6,
      students: [],
   },
   {
      title: "Software Engineering",
      code: "CS30096",
      logo: images.SoftEng,
      credits: [3, 1, 2],
      sem: 6,
      students: [],
   },
   {
      title: "Computer Architecture",
      code: "CS30045",
      logo: images.CompArch,
      credits: [3, 1, 2],
      sem: 6,
      students: [],
   },
   {
      title: "Network Theory",
      code: "CS30012",
      logo: images.CompNetwork,
      credits: [3, 1, 2],
      sem: 6,
      students: [],
   },
];

const getInitials = (name) => {
   var parts = name.split(" ");
   var initials = "";
   for (var i = 0; i < parts.length; i++) {
      if (parts[i].length > 0 && parts[i] !== "") {
         for (var j = 0; j < 4; j++) {
            initials += parts[i][j];
            if (j === parts[i].length - 1) {
               initials += "-";
               break;
            }
         }
         initials += "-";
      }
   }
   return initials;
};

demoSubjects.forEach((subject, index) => {
   for (let i = 0; i < 6; i++) {
      let tempRollNo = [];
      tempRollNo.push(Math.floor(Math.random() * 2) + 18);
      for (let i = 0; i < 2; i++)
         tempRollNo.push(
            String.fromCharCode(Math.floor(Math.random() * 24) + 65)
         );
      for (let i = 0; i < 5; i++)
         tempRollNo.push(Math.floor(Math.random() * 9) + 1);

      subject.students.push({
         name: getInitials(subject.title) + (i + 1),
         rollNo: tempRollNo.join(""),
         isDereg: false,
         isAdded: false,
      });
   }
});

const initialState = {
   isLoadingDataForAuth : false,
   authEmail : null,
   authMode: "SIGNIN",
   hasLogout : false,
   hasSaved  : true,
   auth: null,
   authError: null,
   userId: null,
   token: null,
   refreshToken: null,
   subjects: [],
};

const copySubjects = (subjectsArray) => {
   return subjectsArray
      ? [
           ...subjectsArray.map((subject) => {
              return {
                 ...subject,
                 credits: [...subject.credits],
                 students: subject.students
                    ? subject.students.map((student) => {
                         return {
                            ...student,
                         };
                      })
                    : [],
              };
           }),
        ]
      : [];
};

// localStorage.setItem("demoData" , JSON.stringify(demoSubjects));

const reducer = (state = initialState, action) => {

   //Common Duplicate for The Present State so that we can change the state immutably

   switch (action.type) {
      case actionTypes.DEREG_STUDENT: {
         let subjectsCopy = copySubjects(state.subjects);
         subjectsCopy.forEach((subject, index) => {
            if (subject.code === action.payLoad.code)
               subject.students.forEach((student, index2) => {
                  if (student.name === action.payLoad.name) {
                     subjectsCopy[index].students[
                        index2
                     ].isDereg = !subjectsCopy[index].students[index2].isDereg;

                     subjectsCopy[index].students[index2].isAdded =
                        subjectsCopy[index].students[index2].isAdded &&
                        subjectsCopy[index].students[index2].isDereg;
                  }
               });
         });
         return { ...state, subjects: [...subjectsCopy], hasSaved: false };
      }

      case actionTypes.ADD_STUDENT: {
         let subjectsCopy = copySubjects(state.subjects);
         subjectsCopy.forEach((subject, index) => {
            if (subject.code === action.payLoad.code)
               subject.students.forEach((student, index2) => {
                  if (student.name === action.payLoad.name) {
                     subjectsCopy[index].students[
                        index2
                     ].isAdded = !subjectsCopy[index].students[index2].isAdded;
                  }
               });
         });
         return { ...state, subjects: [...subjectsCopy], hasSaved: false };
      }

      case actionTypes.ADD_ALL_STUDENTS: {
         let subjectsCopy = copySubjects(state.subjects);
         subjectsCopy.forEach((subject, index) => {
            if (subject.code === action.payLoad.code)
               subject.students.forEach((student, index2) => {
                  subjectsCopy[index].students[index2].isAdded = true;
               });
         });
         return { ...state, subjects: [...subjectsCopy], hasSaved: false };
      }

      case actionTypes.MINUS_ALL_STUDENTS: {
         let subjectsCopy = copySubjects(state.subjects);
         subjectsCopy.forEach((subject, index) => {
            if (subject.code === action.payLoad.code)
               subject.students.forEach((student, index2) => {
                  subjectsCopy[index].students[index2].isAdded = false;
               });
         });
         return { ...state, subjects: [...subjectsCopy], hasSaved: false };
      }

      case actionTypes.ADD_NEW_STUDENT: {
         let subjectsCopy = copySubjects(state.subjects);
         subjectsCopy.forEach((subject, index) => {
            if (subject.code === action.payLoad.code) {
               subject.students.push({
                  name: action.payLoad.newStudent.name,
                  rollNo: action.payLoad.newStudent.rollNo,
                  isAdded: false,
                  isDereg: false,
               });
            }
         });
         return { ...state, subjects: [...subjectsCopy], hasSaved: false };
      }

      case actionTypes.ADD_SUBJECT: {
         let subjectsCopy = copySubjects(state.subjects);
         subjectsCopy.push({
            ...action.payLoad.newSubject,
            logo: images.DefaultImg,
            students: [],
         });
         return { ...state, subjects: [...subjectsCopy], hasSaved: false };
      }

      case actionTypes.DELETE_STUDENT: {
         let subjectsCopy = copySubjects(state.subjects);
         subjectsCopy.forEach((subject, index) => {
            if (subject.code === action.payLoad.code)
               subject.students.forEach((student, index2) => {
                  if (student.name === action.payLoad.name) {
                     subjectsCopy[index].students.splice(index2, 1);
                  }
               });
         });
         return { ...state, subjects: [...subjectsCopy], hasSaved: false };
      }

      case actionTypes.DELETE_SUBJECT: {
         let subjectsCopy = copySubjects(state.subjects);
         subjectsCopy.forEach((subject, index) => {
            if (subject.code === action.payLoad.code)
               subjectsCopy.splice(index, 1);
         });
         return { ...state, subjects: [...subjectsCopy], hasSaved: false };
      }

      case actionTypes.LOAD_DEMODATA:
         return {
            ...state,
            token: "demo",
            refreshToken: "demo",
            subjects: demoSubjects,
            // subjects: JSON.parse(localStorage.getItem("demoData")),
         };

      case actionTypes.LOAD_OWNDATA:
         return {
            ...state,
            token : "own",
            refreshToken : "own",
            subjects: action.payload.subjects,
         };

      case actionTypes.AUTH_START:
         return {
            ...state,
            auth: null,
            authError: null,
            userId: null,
            token: null,
            refreshToken: null,
         };

      case actionTypes.AUTH_FAIL:
         return {
            ...state,
            authError: action.payload.err,
         };

      case actionTypes.AUTH_SUCCESS:
         return {
            ...state,
            userId: action.payload.authData.localId,
            token: action.payload.authData.idToken,
            refreshToken: action.payload.authData.refreshToken,

         };

      case actionTypes.AUTH_SWITCH_MODE:
         let signMode = state.authMode;
         if (signMode === "SIGNIN") signMode = "SIGNUP";
         else if (signMode === "SIGNUP") signMode = "SIGNIN";
         return {
            ...state,
            authMode: signMode,
         };

      case actionTypes.AUTH_LOGOUT:
         return {
            ...state,
            subjects: [],
            hasLogout : true,
            authMode: "SIGNIN",
            userId: null,
            token: null,
            refreshToken : null,
         };

      case actionTypes.LOAD_CLOUD_DATA: {
         let subjectsCopy = copySubjects(action.payload.subjects);
         return {
            ...state,
            subjects: subjectsCopy,
         };
      }

      case actionTypes.REFRESH_TOKEN: {
         return {
            ...state,
            token : action.payload.token,
            userId : action.payload.userId,
            refreshToken : action.payload.refreshToken,
         }   
      }

      case actionTypes.SAVE_DATA : {
         return {
            ...state,
            hasSaved : true,
         }
      }
      
      case 'HAS_SAVED':
         return {
            ...state,
            hasSaved : action.payload.hasSaved,
         }

      case actionTypes.START_LOAD: {
         return {
            ...state,
            isLoadingDataForAuth : true,
         }
      }
      case actionTypes.END_LOAD: {
         return {
            ...state,
            isLoadingDataForAuth : false,
         }
      }

      default:
         return state;
   }
};

export default reducer;
