import React from "react";

const Helmet = (props) => {

    document.title = 'Furniture - ' + props.title;
    return (
      <div>
        {props.children}
      </div>
    );
  }
  
export default Helmet;
  