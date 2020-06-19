import React from "react";

import classes from "./Home.css";
import Logo from "../../Assets/Images/tap.png";
import Auth from '../Auth/Auth';

import * as actionTypes from '../../Store/actions/actionTypes';
import { connect } from 'react-redux';

class Home extends React.Component {
   render() {
      return (
         <div className={classes.Home}>
            {/* <div className={classes.LogoContainer}>
               <div className={classes.SpreadOne}></div>
               <div className={classes.SpreadTwo}></div>
               <img src={Logo} alt="Logo" />
            </div> */}
            <Auth/>
            {/* <button onClick={this.props.loadDemoData}>Load Demo Data</button>
            <button onClick={this.props.loadOwnData}>Load Own Data</button> */}
         </div>
      );
   }
}

// const mapStateToProps =

const mapDispatchToProps = dispatch => {
   return {
      loadDemoData: () => dispatch({ type: actionTypes.LOAD_DEMODATA }),
      loadOwnData: () => dispatch({ type: actionTypes.LOAD_OWNDATA }),
   }
}

export default connect(null,mapDispatchToProps)(Home);