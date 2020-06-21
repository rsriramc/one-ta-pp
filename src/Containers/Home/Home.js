import React from "react";

import classes from "./Home.css";
import Logo from "../../Assets/Images/Logo.png";
import Auth from "../Auth/Auth";

import * as actionTypes from "../../Store/actions/actionTypes";
import { connect } from "react-redux";
import Animation from "../../Components/Animation/Animation";

class Home extends React.Component {
   render() {
      // this.componentDidMount(){

      // }
      return (
         <div className={classes.Home}>
            <img className={classes.Logo} src={Logo} alt="Logo" />
            <div className={classes.Flex}>
               <Animation />
               {this.props.isAuth !== null &&
               this.props.isAuth !== "demo" &&
               this.props.isAuth !== "own" ? (
                  null
               ) : <Auth />}
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      isAuth: state.token,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      loadDemoData: () => dispatch({ type: actionTypes.LOAD_DEMODATA }),
      loadOwnData: () => dispatch({ type: actionTypes.LOAD_OWNDATA }),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
