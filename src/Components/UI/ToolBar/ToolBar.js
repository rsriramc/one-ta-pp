import React from "react";
import Wrap from "../../../hoc/Wrap/Wrap";
import Logo from "../../../Assets/Images/Logo.png";

import classes from "./ToolBar.css";
import HamBurger from "./HamBurger/HamBurger";
import Navigation from "./Navigation/Navigation";
import BackDrop from '../BackDrop/BackDrop';
import SideDrawer from '../SideDrawer/SideDrawer';

import { connect } from "react-redux";

class ToolBar extends React.Component {
   state = {
      isOpened: false,
   };
   render() {
      return (
         <Wrap>
            <div className={classes.ToolBar}>
               <img className={classes.Logo} src={Logo} alt="Logo" />
               <Navigation isAuth={this.props.isAuth} />
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
               ></SideDrawer>
            </div>
         </Wrap>
      );
   }
}

const mapStateToProps = state => {
   return {
      isAuth : state.token !== null,
   };
}

// const mapDispatchToProps = dispatch => {
//    return {

//    }
// }

export default connect(mapStateToProps)(ToolBar);
