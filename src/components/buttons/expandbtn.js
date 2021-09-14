import React from "react";
import { Button } from "reactstrap";

export function Expandbtn() {
  return (
    <Button
      size="sm"
      style={{
        width: "80%",
        fontSize: "15px",
        backgroundColor: "#2f56a1",
        color: "white",
        marginBottom: "3px",
      }}
    >
      Expand
    </Button>
  );
}
