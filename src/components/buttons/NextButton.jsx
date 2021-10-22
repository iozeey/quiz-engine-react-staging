import React from "react";
import SimpleButton from "./SimpleButton";

const NextButton = ({...props}) => (
  <SimpleButton
    outline
    type="button"
    className="btn btn-lg"
    style={{ backgroundColor: "#2f56a1", color: "white" }}
    label="Next"
    {...props}
  />
);

export default NextButton;
