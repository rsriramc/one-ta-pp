import * as actionTypes from "./actions.js";
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
   subjects: demoSubjects,
};

// localStorage.setItem("demoData" , JSON.stringify(demoSubjects));

const reducer = (state = initialState, action) => {
   //Common Duplicate for The Present State so that we can change the state immutably

   const subjectsCopy = [
      ...state.subjects.map((subject) => {
         return {
            ...subject,
            credits: [...subject.credits],
            students: subject.students.map((student) => {
               return {
                  ...student,
               };
            }),
         };
      }),
   ];

   switch (action.type) {
      case actionTypes.DEREG_STUDENT:
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
         return { ...state, subjects: [...subjectsCopy] };

      case actionTypes.ADD_STUDENT:
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
         return { ...state, subjects: [...subjectsCopy] };

      case actionTypes.ADD_ALL_STUDENTS:
         subjectsCopy.forEach((subject, index) => {
            if (subject.code === action.payLoad.code)
               subject.students.forEach((student, index2) => {
                  subjectsCopy[index].students[index2].isAdded = true;
               });
         });
         return { ...state, subjects: [...subjectsCopy] };

      case actionTypes.MINUS_ALL_STUDENTS:
         subjectsCopy.forEach((subject, index) => {
            if (subject.code === action.payLoad.code)
               subject.students.forEach((student, index2) => {
                  subjectsCopy[index].students[index2].isAdded = false;
               });
         });
         return { ...state, subjects: [...subjectsCopy] };

      case actionTypes.ADD_NEW_STUDENT:
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
         return { ...state, subjects: [...subjectsCopy] };

      case actionTypes.ADD_SUBJECT:
         subjectsCopy.push({
            ...action.payLoad.newSubject,
            logo: images.DefaultImg,
            students: [],
         });
         return { ...state, subjects: [...subjectsCopy] };

      case actionTypes.DELETE_STUDENT:
         subjectsCopy.forEach((subject, index) => {
            if (subject.code === action.payLoad.code)
               subject.students.forEach((student, index2) => {
                  if (student.name === action.payLoad.name) {
                     subjectsCopy[index].students.splice(index2, 1);
                  }
               });
         });
         return { ...state, subjects: [...subjectsCopy] };

      case actionTypes.DELETE_SUBJECT:
         subjectsCopy.forEach((subject, index) => {
            if (subject.code === action.payLoad.code)
               subjectsCopy.splice(index, 1);
         });
         return { ...state, subjects: [...subjectsCopy] };

      case actionTypes.LOAD_DEMODATA:
         return {
            ...state,
            subjects: demoSubjects,
            // subjects: JSON.parse(localStorage.getItem("demoData")),
         };

      case actionTypes.LOAD_OWNDATA:
         return {
            ...state,
            subjects: [],
         };

      default:
         return state;
   }
};

export default reducer;
