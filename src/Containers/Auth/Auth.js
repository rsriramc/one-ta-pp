import React from "react";

import classes from "./Auth.css";
// import key from "../../Components/UI/keygenerator";

// import Input from '../../Components/UI/Input/Input';

import * as actions from "../../Store/actions/actionCreators";
import * as actionTypes from '../../Store/actions/actionTypes';
import { connect } from "react-redux";
import axios from "axios";

class Auth extends React.Component {
   componentWillUnmount = () => {
      axios
         .post(
            "https://one-ta-pp.firebaseio.com/subjects.json?auth=" +
               this.props.token,
            {
               subjects: { physics: 1, chem: 2 },
            }
         )
         .then((response) => {
            console.log(response.data);
         });
   };
   state = {
      controls: [
         {
            name: "email",
            elementType: "input",
            elementConfig: {
               type: "email",
               placeHolder: "Email ID",
            },
            validation: {
               required: true,
               isEmail: true,
            },
            value: "",
            isValid: false,
            isTouched: false,
         },
         {
            name: "password",
            elementType: "password",
            elementConfig: {
               type: "password",
               placeHolder: "Password",
            },
            validation: {
               required: true,
               minLength: 6,
            },
            value: "",
            isValid: false,
            isTouched: false,
         },
      ],
   };

   isTheInputValid = (elementName, value, rules) => {
      let isValid = true;

      if (rules.required) isValid = isValid && value.length !== 0;

      if (rules.isEmail) {
         const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
         isValid = pattern.test(value) && isValid;
      }

      if (rules.minLength) isValid = isValid && value.length >= rules.minLength;

      return isValid;
   };

   valueChangeHandler = (elementName, event) => {
      const copyStateControls = [...this.state.controls];
      copyStateControls.forEach((control) => {
         if (elementName === control.name) {
            control.value = event.target.value;
            control.isValid = this.isTheInputValid(
               elementName,
               event.target.value,
               control.validation
            );
            control.isTouched = true;
         }
      });

      this.setState({ controls: copyStateControls });
   };

   submitHandler = (e) => {
      // axios
      //    .post("https://one-ta-pp.firebaseio.com/subjects.json?auth=" + this.props.token, {
      //       subjects: {physics : 1, chem :2},
      //    })
      //    .then((response) => {
      //       console.log(response.data);
      //    });
      e.preventDefault();
      this.props.auth(
         this.state.controls[0].value,
         this.state.controls[1].value,
         this.props.authMode
      );
   };

   render = () => {
      let error = [];
      let string = this.props.error;
      if (string !== null) {
         string
            .toLowerCase()
            .split("")
            .forEach((char, index) => {
               if (char === "_") {
                  char = " ";
               }
               error.push(char);
            });
      }

      let form = this.state.controls.map((control) => {
         return (
            <input
               key={control.name}
               value={control.value}
               onChange={(e) => this.valueChangeHandler(control.name, e)}
               type={control.elementConfig.type}
               placeholder={control.elementConfig.placeHolder}
               className={
                  !control.isValid
                     ? control.isTouched
                        ? classes.InValid
                        : classes.Valid
                     : classes.Valid
               }
            />
         );
      });

      return (
         <div className={classes.Auth}>
            <p>Authentication</p>
            <form
               onSubmit={(e) => {
                  this.submitHandler(e);
               }}
            >
               {form}
               {this.props.error ? (
                  <p className={classes.Error}>{error.join("")}</p>
               ) : null}
               <button
                  className={classes.Sign}
                  onClick={(e) => {
                     this.submitHandler(e);
                  }}
               >
                  {this.props.authMode === "SIGNIN" ? "Sign In" : "Sign Up"}
               </button>
               {this.props.authMode === "SIGNIN" ? (
                  <p>Do not have an account?</p>
               ) : (
                  <p>Already have an account?</p>
               )}
               <button
                  className={classes.Sign}
                  onClick={(e) => {
                     e.preventDefault();
                     this.props.switchAuthMode();
                  }}
               >
                  {this.props.authMode === "SIGNIN"
                     ? "Create Account"
                     : "Go to Sign In"}
               </button>
               <p
                  className={classes.ParaLinks}
                  onClick={(e) => {
                     e.preventDefault();
                     this.props.loadDemoData();
                  }}
               >
                  Skip Signing and Load Demo Data
               </p>
               <p
                  className={classes.ParaLinks}
                  onClick={(e) => {
                     e.preventDefault();
                     this.props.loadOwnData();
                  }}
               >
                  Skip Signing and Load Own Data
               </p>
            </form>
         </div>
      );
   };
}

const mapStateToProps = (state) => {
   return {
      authMode: state.authMode,
      error: state.authError,
      token: state.token,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      auth: (email, password, authMode) =>
         dispatch(actions.auth(email, password, authMode)),
      switchAuthMode: () => dispatch(actions.authSwitchMode()),
      loadDemoData: () => dispatch({ type: actionTypes.LOAD_DEMODATA }),
      loadOwnData: () => dispatch({ type: actionTypes.LOAD_OWNDATA }),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
