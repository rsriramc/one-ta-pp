import React from "react";
import Wrap from "../../../hoc/Wrap/Wrap";
import Logo from "../../../Assets/Images/Logo.png";

import classes from "./ToolBar.css";
import HamBurger from "./HamBurger/HamBurger";
import Navigation from "./Navigation/Navigation";
import BackDrop from '../BackDrop/BackDrop';
import SideDrawer from '../SideDrawer/SideDrawer';

class ToolBar extends React.Component {
   state = {
      isOpened: false,
   };
   render() {
      return (
         <Wrap>
            <div className={classes.ToolBar}>
               <img className={classes.Logo} src={Logo} alt="Logo" />
               <Navigation />
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

export default ToolBar;
