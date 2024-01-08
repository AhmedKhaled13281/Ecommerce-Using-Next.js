import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Col,
  Form,
  InputGroup,
  Row,
  FloatingLabel,
  Modal,
} from "react-bootstrap";
import { LiaEditSolid } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebaseConfig";
import Image from "next/image";


const EditModal = ({ product , categories}) => {
  const [validated, setValidated] = useState(false);

  const [title, setTitle] = useState(product.title || "");
  const [description, setDescription] = useState(product.description || "");
  const [price, setPrice] = useState(product.price || "");
  const [images, setImages] = useState(product.imageUrls || []);
  const [imageUrls, setImageUrls] = useState(product.imageUrls || []);
  const [dropDownValue , setDropDownValue] = useState(product.category || '')

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handle = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const updatedData = {
      title: title,
      description: description,
      price: price,
      imageUrls: imageUrls,
      category : dropDownValue
    };

    const hasNonEmptyValues = Object.values(updatedData).every(
      (value) => !!value
    );
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (hasNonEmptyValues && imageUrls.length > 0) {
      const res = await fetch("/api/products/productApi", {
        method: "PUT",
        body: JSON.stringify({ ...updatedData, id: product._id }),
        headers: { "Content-Type": "application/json" },
      });
      console.log(await res.json());
      console.log(updatedData);
      setValidated(true);
      handleClose();
    }
  };

  const handleDropDownInput = (e) => {
    setDropDownValue(e.target.value);
  };

  // Handle Upload Image
  const handleImageChange = async (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => [...prevImages, ...newImages]);

      const imageRef = ref(storage, `images/${files[0].name + Date.now()}`);
      try {
        const snapshot = await uploadBytes(imageRef, files[0]);
        const url = await getDownloadURL(snapshot.ref);

        // Use the URL as needed, e.g., store it in state or perform further actions
        setImageUrls((prev) => [...prev, url]);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...images];
    const updatedImagesUrls = [...imageUrls];
    updatedImagesUrls.splice(index, 1);
    updatedImages.splice(index, 1);

    setImages(updatedImages);
    setImageUrls(updatedImagesUrls);
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Button
        onClick={handleShow}
        className=" me-3"
        variant="outline-secondary"
      >
        <LiaEditSolid className="fs-4" />
        Edit
      </Button>
      <Modal show={show} centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handle}>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Label>Product name</Form.Label>
                <Form.Control
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  required
                  type="text"
                  placeholder="Product name"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row>
            <Form.Group className="mb-3">
              <Form.Select value={dropDownValue} onChange={handleDropDownInput}>
                <option>No Parent Category</option>
                {categories.map((item ,index) => (
                  <option key={index}>{item?.categoryName}</option>
                ))}
              </Form.Select>
            </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Label>Photos</Form.Label>
                <Form.Control
                  onChange={handleImageChange}
                  accept="image/*"
                  type="file"
                  required={!imageUrls.length > 0}
                />
                {images.length > 0 && (
                  <div
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center me-3 mb-3 flex-column"
                      >
                        <Image
                          src={image}
                          alt={`Uploaded ${index + 1}`}
                          className="rounded me-2 mb-3"
                          width={100}
                          height={100}
                        />
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteImage(index)}
                        >
                          <MdDeleteOutline className="fs-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                  as="textarea"
                  placeholder="Write Your Description"
                  style={{ height: "100px" }}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Label>Price</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    required
                    min="0"
                    type="number"
                    pattern="[0-9]*"
                    aria-label="Amount (to the nearest dollar)"
                  />
                  <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handle}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditModal;
