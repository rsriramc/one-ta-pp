import React from "react";

import classes from "./Auth.css";

import * as actions from "../../Store/actions/actionCreators";
// import * as actionTypes from "../../Store/actions/actionTypes";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router";
// import axios from "axios";

class Auth extends React.Component {
   // componentWillUnmount = () => {
   //    localStorage.setItem("subjects", this.props.isAuth);
   // };

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
               placeHolder: "Password (Min 6 Chars)",
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
      e.preventDefault();
      this.props.auth(
         this.state.controls[0].value,
         this.state.controls[1].value,
         this.props.authMode,
         this.props.history
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
            {this.props.isAuth !== null &&
            this.props.isAuth !== "demo" &&
            this.props.isAuth !== "own" ? (
               <Redirect to="/subjects/" />
            ) : null}
            <p>
               Sign In to have access to store your data in cloud and transfer
               your work across devices.
            </p>
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
                     this.props.history.push("/subjects");
                     this.props.loadDemoData(this.props.history);
                  }}
               >
                  Skip Sign In and Load Demo Data
               </p>
               <p
                  className={classes.ParaLinks}
                  onClick={(e) => {
                     e.preventDefault();
                     this.props.history.push("/subjects");
                     this.props.loadOwnData(this.props.history);
                  }}
               >
                  Skip Sign In and work locally on device
               </p>
            </form>
         </div>
      );
   };
}

const mapStateToProps = (state) => {
   return {
      isAuth: state.token,
      authMode: state.authMode,
      error: state.authError,
      token: state.token,
      userId: state.userId,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      auth: (email, password, authMode, history) =>
         dispatch(actions.auth(email, password, authMode, history)),
      switchAuthMode: () => dispatch(actions.authSwitchMode()),
      loadDemoData: (history) => dispatch(actions.demoAuth(history)),
      loadOwnData: (history) => dispatch(actions.ownAuth(history))
   };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
