import React from "react";

export function Sendtaskbtn({...props}) {
     return (
          <a  {...props} class="btn btn-lg" style={{ backgroundColor: "#2f56a1", color: "white", width: "150px" }}>Send Task</a>
     );
}
