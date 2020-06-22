import React from "react";

//Styles
// import classes from "./App.css";

//Components
import Wrap from "./hoc/Wrap/Wrap";
import Content from "./Components/Content/Content";
import Subjects from "./Containers/Subjects/Subjects";
import Students from "./Containers/Students/Students";
import DeregAnalysis from "./Components/DeregAnalysis/DeregAnalysis";
import Home from "./Containers/Home/Home";
import PageNotFound from "./Components/UI/PageNotFound/PageNotFound";

//Accessories
import { Route, Switch/*, Redirect*/ } from "react-router-dom";
import { connect } from "react-redux";
import Logout from "./Containers/Logout/Logout";
import * as actions  from "./Store/actions/actionCreators";
// import Welcome from "./Containers/Welcome/Welcome";

class App extends React.Component {
   componentDidMount = () => {
      // let rt = JSON.parse(localStorage.getItem("refreshToken"))
      this.props.autoLogin();
   };
   render = () => (
      <Wrap>
         <Content>
            {this.props.isAuth ? (
               <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/subjects" exact component={Subjects} />
                  <Route path="/deregAnalysis" component={DeregAnalysis} />
                  <Route path="/logout" component={Logout} />
                  <Route path="/subjects/:code" component={Students} />
                  <Route component={PageNotFound} />
               </Switch>
            ) : (
               <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/subjects" exact component={Subjects} />
                  <Route path="/logout" component={Logout} />
                  <Route path="/deregAnalysis" component={DeregAnalysis} />
                  <Route component={PageNotFound} />
               </Switch>
            )}
         </Content>
      </Wrap>
   );
}

const mapStateToProps = (state) => {
   return {
      subjects: state.subjects,
      isAuth: state.token !== null,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      autoLogin: () => dispatch(actions.autoLogin()),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
