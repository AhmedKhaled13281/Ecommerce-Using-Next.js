import { product } from "@/Models/ProductSchema";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdDeleteOutline } from "react-icons/md";

const DeleteModal = ({id , title , deleteType}) => {
  const [show, setShow] = useState(false);
  const [loading , setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteApis = {
     "product" : "/api/products/productApi",
     "category" : "/api/categories/categoryApi",
     "user" : "/api/users/usersApi"
  }

  const handle = async () => {
    if(id){
        const res = await fetch(`${deleteApis[deleteType]}`, {
          method: "DELETE",
          body: JSON.stringify({ id }),
          headers: { "Content-Type": "application/json" },
        });
        console.log(await res.json());
        handleClose();
        setLoading(true);
    }
  }
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Button onClick={handleShow} variant="outline-danger">
        <MdDeleteOutline className="fs-4" />
        Delete
      </Button>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Are You Sure That You Want To Delete `{title}` ?</h5>
        </Modal.Body>
        <Modal.Footer>
            {loading ? <p className="text-center">Loading ...</p> : (<>
              <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={handle}>
            Yes
          </Button>
            </>)}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteModal;
