import React from "react";

import { connect } from 'react-redux';

import * as actions from '../../Store/actions/actionCreators';

import { Redirect } from 'react-router-dom';

class Logout extends React.Component {
   componentDidMount = () => {
      this.props.logout(this.props.refreshToken);
   };

   render = () => {
      return <Redirect to="/" />;
   }
}

const mapStateToProps = state => {
   return {
      refreshToken : state.refreshToken
   }
}

const mapDispatchToProps = dispatch => {
   return {
      logout : (rt) => dispatch(actions.authLogout(rt))
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(Logout);
