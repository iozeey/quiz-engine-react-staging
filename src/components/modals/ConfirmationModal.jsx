import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody, ModalFooter } from "reactstrap";

const ConfirmationModal = ({ isOpen, toggle, onClick }) => {
  return (
    <Modal
    isOpen={isOpen}
    size="lg"
    toggle={toggle}
    className="modal-dialog-centered "
  >
    <ModalBody>
      <h4 className="text-primary">
        <strong>Are you sure!</strong>
      </h4>
      <p>After submitting your work, you cannot making any changes.</p>
    </ModalBody>
    <ModalFooter style={{ border: 0 }}>
      <button
        type="submit"
        class="btn btn-sm mx-3 modal-button"
        onClick={onClick}
      >
        Submit
      </button>
    </ModalFooter>
  </Modal>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  creatQuizDataAndSubmit: PropTypes.func.isRequired,
};

ConfirmationModal.defaultProps = { isOpen: false, };

export default ConfirmationModal;
