import React from "react";

export function Savebtn(props){
    return (
         <button type="button" class="btn btn-lg" style={{ backgroundColor :"#2f56a1",color:"white",width:"150px"}} onClick={props.click}>Save</button>
    )
  }
