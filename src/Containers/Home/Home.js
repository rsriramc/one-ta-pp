import React from "react";

import classes from "./Home.css";
import Logo from "../../Assets/Images/tap.png";

class Home extends React.Component {
   render() {
      return (
         <div className={classes.Home}>
            <div className={classes.LogoContainer}>
               <div className={classes.SpreadOne}></div>
               <div className={classes.SpreadTwo}></div>
               <img src={Logo} alt="Logo" />
            </div>
         </div>
      );
   }
}

export default Home;