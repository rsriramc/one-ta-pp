import React from "react";

//Styles
import "./App.css";

//Components
import Wrap from "./hoc/Wrap/Wrap";
import Content from "./Components/Content/Content";
import Subjects from "./Containers/Subjects/Subjects";
import Students from "./Containers/Students/Students";
import DeregAnalysis from "./Components/DeregAnalysis/DeregAnalysis";
import Home from "./Containers/Home/Home";
import PageNotFound from "./Components/UI/PageNotFound/PageNotFound";
import Auth from './Containers/Auth/Auth';

//Accessories
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Logout from "./Containers/Logout/Logout";

class App extends React.Component {
   render = () => (
      <Wrap>
         <Content>
            <Switch>
               <Route path="/" exact component={Home} />
               <Route path="/subjects" exact component={Subjects} />
               <Route path="/deregAnalysis" component={DeregAnalysis} />
               <Route path="/auth" component={Auth} />
               <Route path="/logout" component={Logout} />
               <Route path="/subjects/:code" component={Students} />
               <Route component={PageNotFound} />
            </Switch>
         </Content>
      </Wrap>
   );
}

const mapStateToProps = (state) => {
   return {
      subjects: state.subjects,
   };
};

export default connect(mapStateToProps, null)(App);
