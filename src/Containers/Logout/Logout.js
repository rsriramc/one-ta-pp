import React from "react";

import { connect } from 'react-redux';

import * as actions from '../../Store/actions/actionCreators';

import { Redirect } from 'react-router-dom';

class Logout extends React.Component {
   componentDidMount = () => {
      this.props.logout();
   };

   render = () => {
      return <Redirect to="/" />;
   }
}

// const mapStateToProps = state => {
//    return{}
// }

const mapDispatchToProps = dispatch => {
   return {
      logout : () => dispatch(actions.authLogout())
   }
}

export default connect(null,mapDispatchToProps)(Logout);
