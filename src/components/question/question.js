import React from "react";

const Question = ({ counter, title, counterClass, showNumbers ,alignement}) => (
  <div className="d-flex align-items-start">
    {showNumbers && <span className={alignement === "Top"?" d-flex align-self-top": alignement=== "Center"? " d-flex align-self-center":  " d-flex align-self-end"} ><strong  className={counterClass}>{counter} </strong></span>}
    <span>{title}</span>
  </div>
);

export default Question;
