import React from "react";
import SimpleButton from "./SimpleButton";

const OpenButton = ({ ...props }) => (
  <SimpleButton outline color="" label={<strong>Open</strong>} {...props} />
);

export default OpenButton;
