import React from "react";

const Question = ({ counter, title, counterClass, showNumbers }) => (
  <div className="d-flex align-items-start">
    {showNumbers && <strong className={counterClass}>{counter} </strong>}
    <span>{title}</span>
  </div>
);

export default Question;
