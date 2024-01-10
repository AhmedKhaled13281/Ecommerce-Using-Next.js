import React, { useCallback, useState, useReducer, useEffect } from "react";
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

const initialState = {
  title: "",
  description: "",
  price: "",
  images: [],
  imageUrls: [],
  dropDownValue: "",
  validated: false,
  show: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "SET_PRICE":
      return { ...state, price: action.payload };
    case "SET_IMAGES":
      return { ...state, images: action.payload };
    case "SET_IMAGE_URLS":
      return { ...state, imageUrls: action.payload };
    case "SET_DROP_DOWN_VALUE":
      return { ...state, dropDownValue: action.payload };
    case "SET_VALIDATED":
      return { ...state, validated: action.payload };
    case "SET_SHOW":
      return { ...state, show: action.payload };
    default:
      return state;
  }
};

const EditModal = ({ product, categories }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    // Set initial state based on product prop
    if (product) {
      dispatch({ type: "SET_TITLE", payload: product.title || "" });
      dispatch({ type: "SET_DESCRIPTION", payload: product.description || "" });
      dispatch({ type: "SET_PRICE", payload: product.price || "" });
      dispatch({ type: "SET_IMAGES", payload: product.imageUrls || [] });
      dispatch({ type: "SET_IMAGE_URLS", payload: product.imageUrls || [] });
      dispatch({ type: "SET_DROP_DOWN_VALUE", payload: product.category || "" });
    }
  }, [product]);

  const handleChange = useCallback(
    (type) => (e) => {
      dispatch({ type, payload: e.target.value });
    },
    [dispatch]
  );

  const handleClose = () => {
    dispatch({ type: "SET_SHOW", payload: false });
  };

  const handleShow = () => {
    dispatch({ type: "SET_SHOW", payload: true });
  };

  const handle = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const updatedData = {
      title: state.title,
      description: state.description,
      price: state.price,
      imageUrls: state.imageUrls,
      category: state.dropDownValue,
    };

    const hasNonEmptyValues = Object.values(updatedData).every(
      (value) => !!value
    );
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (hasNonEmptyValues && state.imageUrls.length > 0) {
      const res = await fetch("/api/products/productApi", {
        method: "PUT",
        body: JSON.stringify({ ...updatedData, id: product._id }),
        headers: { "Content-Type": "application/json" },
      });
      console.log(await res.json());
      console.log(updatedData);

      dispatch({ type: "SET_VALIDATED", payload: true });
      handleClose();
    }
  };


  const handleDropDownInput = (e) => {
    dispatch({ type: "SET_DROP_DOWN_VALUE", payload: e.target.value });
  };

  // Handle Upload Image
  const handleImageChange = async (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      dispatch({ type: "SET_IMAGES", payload: [...state.images, ...newImages] });

      const imageRef = ref(storage, `images/${files[0].name + Date.now()}`);
      try {
        const snapshot = await uploadBytes(imageRef, files[0]);
        const url = await getDownloadURL(snapshot.ref);

        // Use the URL as needed, e.g., store it in state or perform further actions
        dispatch({ type: "SET_IMAGE_URLS", payload: [...state.imageUrls, url] });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...state.images];
    const updatedImagesUrls = [...state.imageUrls];
    updatedImagesUrls.splice(index, 1);
    updatedImages.splice(index, 1);

    dispatch({ type: "SET_IMAGES", payload: updatedImages });
    dispatch({ type: "SET_IMAGE_URLS", payload: updatedImagesUrls });
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
      <Modal show={state.show} centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={state.validated} onSubmit={handle}>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Label>Product name</Form.Label>
                <Form.Control
                  onChange={handleChange("SET_TITLE")}
                  value={state.title}
                  required
                  type="text"
                  placeholder="Product name"
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group className="mb-3">
                <Form.Select
                  value={state.dropDownValue}
                  onChange={handleChange("SET_DROP_DOWN_VALUE")}
                >
                  <option>No Parent Category</option>
                  {categories.map((item, index) => (
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
                  required={!state.imageUrls.length > 0}
                />
                {state.images.length > 0 && (
                  <div
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {state.images.map((image, index) => (
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
                  onChange={handleChange("SET_DESCRIPTION")}
                  value={state.description}
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
                    onChange={handleChange("SET_PRICE")}
                    value={state.price}
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
