import React from "react";
import withClass from "../../hoc/withClass";

function Layout(props) {
  return (
    <div>
      <div>{props.header}</div>
      <div className="container">
          {props.menu}  
      </div>
      <div className="container">
        {props.content}
      </div>
      <div>{props.footer}</div>
    </div>
  );
}

export default withClass(Layout, 'layout');