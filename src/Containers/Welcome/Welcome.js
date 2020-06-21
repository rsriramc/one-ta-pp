import React from "react";

import classes from "./Welcome.css";

import Logo from '../../Assets/Images/Logo.png';

import { connect } from "react-redux";
import * as actions from "../../Store/actions/actionCreators";
import Animation from "../../Components/Animation/Animation";
import Wrap from '../../hoc/Wrap/Wrap';
import Auth from '../Auth/Auth';

class Welcome extends React.Component {

   state = {
      number: 1,
      width : window.innerWidth,
   }
   componentDidMount = () => {
      window.addEventListener('resize', (e) => {
          this.setState({ width: window.innerWidth });
      })
   }
   render = () => {
      return (
         <Wrap>
            <div className={classes.Welcome}>
               <img className={classes.Logo} src={Logo} alt="Logo"/>
               <Animation scale={this.state.width< 500 ? this.state.width / 600 : 1} />
               {/* <Auth /> */}
            </div>
            ;
         </Wrap>
      );
   };
}

export default Welcome;
