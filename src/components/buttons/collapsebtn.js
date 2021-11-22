import React from "react";
import { Button } from "reactstrap";

export function Collapsebtn(props) {
  return (
    <Button
      size="sm"
      style={{
        backgroundColor: "#2f56a1",
        color: "white",
        marginBottom: "3px",
      }}
    >
      <img src={"arrowup.png"} alt="" />
      Collapse
    </Button>
  );
}
