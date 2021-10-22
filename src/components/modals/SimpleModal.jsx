import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody, ModalFooter } from "reactstrap";

const SimpleModal = ({ isOpen, size, toggle, bodyContent, footerContent }) => {
  return (
    <Modal
      size={size}
      isOpen={isOpen}
      toggle={toggle}
      className="modal-dialog-centered "
    >
      <ModalBody>{bodyContent}</ModalBody>
      <ModalFooter style={{ border: 0 }}>{footerContent}</ModalFooter>
    </Modal>
  );
};

SimpleModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

SimpleModal.defaultProps = { isOpen: false, size: "lg" };

export default SimpleModal;
