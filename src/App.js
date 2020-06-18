import React from "react";

//Styles
import "./App.css";

//Components
import Wrap from "./hoc/Wrap/Wrap";
import Content from "./Components/Content/Content";
import Subjects from "./Containers/Subjects/Subjects";
import Students from "./Components/Students/Students";
import DeregAnalysis from "./Components/DeregAnalysis/DeregAnalysis";
import Home from "./Containers/Home/Home";
import PageNotFound from "./Components/UI/PageNotFound/PageNotFound";

//Accessories
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

// import * as actionTypes from "./Store/actions";
// import axios from "axios";

class App extends React.Component {
   render = () => (
      <Wrap>
         <Content>
            <Switch>
               <Route path="/" exact component={Home} />
               <Route path="/subjects" exact component={Subjects} />
               <Route path="/deregAnalysis" component={DeregAnalysis} />
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
