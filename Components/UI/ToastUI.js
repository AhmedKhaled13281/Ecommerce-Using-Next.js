import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const ToastUI = ({ show, handleClose }) => {
  return (
    <>
    {show && (
      <>
       <ToastContainer
       key={1}
        className="p-3"
        position="bottom-end"
        style={{ zIndex: 3000 }}

      >
        <Toast onClose={() => handleClose(false)} bg="success" show={show} >
          <Toast.Header>
            <strong className="me-auto">Product Added Successfully</strong>
          </Toast.Header>
          <Toast.Body className="text-light">Woohoo, Congratulations</Toast.Body>
        </Toast>
      </ToastContainer>
      </>
    )}
    </>
  );
};

export default ToastUI;
