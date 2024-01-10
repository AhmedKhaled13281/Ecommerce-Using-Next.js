import React, { useState, useRef } from "react";
import {
  Button,
  Col,
  Form,
  InputGroup,
  Row,
  FloatingLabel,
} from "react-bootstrap";
import { MdDeleteOutline } from "react-icons/md";
import Image from "next/image";

const AddForm = ({
  validated,
  handleSubmit,
  productNameRef,
  descriptionRef,
  priceRef,
  images,
  handleImageChange,
  handleDeleteImage,
  handleDropDownInput,
  categories,
}) => {
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <Form.Label>Product name</Form.Label>
            <Form.Control
              ref={productNameRef}
              required
              type="text"
              placeholder="Product name"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="mb-3">
            <Form.Select onChange={handleDropDownInput}>
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
              required
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
              ref={descriptionRef}
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
                ref={priceRef}
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
    </>
  );
};

export default AddForm;
