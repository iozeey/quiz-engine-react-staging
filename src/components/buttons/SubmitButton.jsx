import React from "react";

const SubmitButton = ({...props}) => {
  return (
    <input
      type="submit"
      class="btn btn-lg"
      style={{ backgroundColor: "#2f56a1", color: "white", width: "150px"}}
      {...props}
    />
  );
};

export default SubmitButton;
