import React from "react";

export const getDomainUrl = () => `${window.location.origin}`;

export function Header() {
  return (
    <img 
      src={`${getDomainUrl()}/logo1.png`}
      style={{ width: "300px" , marginLeft: "30px"}}
      alt=""
    />
  );
}
