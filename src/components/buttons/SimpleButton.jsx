import PropTypes from "prop-types";
import React from "react";
import { Button } from "reactstrap";
import "./SimpleButton.scss";
import cn from "classname";

const SimpleButton = ({ label, ...props }) => {
  return (
    <Button className={cn("simple-button w-20")} {...props}>
      {label}
    </Button>
  );
};

SimpleButton.propTypes = {
  label: PropTypes.string.isRequired,
};

export default SimpleButton;
