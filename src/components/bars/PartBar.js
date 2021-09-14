import React from "react";
import "./PartBar.scss";

const PartBar = ({ className, currentPage, onClick }) => {
  return <div className={className} onClick={() => onClick(currentPage)}></div>;
};

export default PartBar;
