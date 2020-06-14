import React from "react";

import Wrap from "../../hoc/Wrap/Wrap";
import ToolBar from '../UI/ToolBar/ToolBar';

const content = (props) => {
   return (
      <Wrap>
         <ToolBar/>
         {props.children}
      </Wrap>
   );
};

export default content;
