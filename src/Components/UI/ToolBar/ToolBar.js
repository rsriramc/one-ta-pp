import React from "react";
import Wrap from "../../../hoc/Wrap/Wrap";
import Logo from "../../../Assets/Images/Logo.png";

import Alert from "../Alert/Alert";

import classes from "./ToolBar.css";
import HamBurger from "./HamBurger/HamBurger";
import Navigation from "./Navigation/Navigation";
import BackDrop from "../BackDrop/BackDrop";
import SideDrawer from "../SideDrawer/SideDrawer";
// import NavigationItem from "./Navigation/NavigationItems/NavigationItem/NavigationItem";

import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class ToolBar extends React.Component {
   state = {
      isOpened: false,
      alertMessage: "Are you sure want to log out? Any local data not saved to cloud would be erased.",
      alertShow: false,
      alertButtons: [
         "Cancel",
         <NavLink
            className={classes.logoutBtn}
            exact={true}
            to="/logout"
         >
            Logout
         </NavLink>,
      ],
      alertActions: [
         () => {
            this.setState({
               alertShow: false,
            });
         },

         () => {
            this.setState({
               alertShow: false,
            });
         },
      ],
   };
   render() {
      return (
         <Wrap>
            <div className={classes.ToolBar}>
               <img className={classes.Logo} src={Logo} alt="Logo" />
               <Navigation
                  isAuth={this.props.isAuth}
                  logout={() => {
                     this.setState({ alertShow: true });
                  }}
               />
               <HamBurger
                  status={this.state.isOpened}
                  clicked={() => {
                     this.setState((prevState) => {
                        return {
                           isOpened: !prevState.isOpened,
                        };
                     });
                  }}
               />
               <BackDrop
                  show={this.state.isOpened}
                  clicked={() => {
                     this.setState((prevState) => {
                        return {
                           isOpened: false,
                        };
                     });
                  }}
               />
               <SideDrawer
                  isAuth={this.props.isAuth}
                  isOpened={this.state.isOpened}
                  hide={() => {
                     this.setState((prevState) => {
                        return {
                           isOpened: false,
                        };
                     });
                  }}
                  logout={() => {
                     this.setState({ alertShow: true });
                  }}
               ></SideDrawer>
            </div>
            <Alert
               show={this.state.alertShow}
               buttons={this.state.alertButtons}
               message={this.state.alertMessage}
               actions={this.state.alertActions}
            >
               Hello
            </Alert>
            <BackDrop
               show={this.state.alertShow}
               clicked={() => {
                  this.setState({
                     alertShow: false,
                  });
               }}
            />
         </Wrap>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      isAuth: state.token,
   };
};

export default connect(mapStateToProps)(ToolBar);
