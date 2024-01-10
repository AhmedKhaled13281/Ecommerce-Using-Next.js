import React, { useState, useRef } from "react";
import { Button, Col, Row, Container, Form } from "react-bootstrap";
import CategoryTable from "@/Components/Categories/CategoryTable";

const Categories = () => {
  const categoryNameRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryNameValue = categoryNameRef.current.value;
    
    const data = {
      categoryName: categoryNameValue,
    };

    if (
       data.categoryName 
    ) {
      const res = await fetch("/api/categories/categoryApi" , {
        method : "POST",
        body : JSON.stringify(data),
        headers : {'Content-Type' : 'application/json'}
      })

      console.log(await res.json());
    } else {
      console.log("object")
    }
  };




  return (
    <div className="px-3 mt-3">
      <Row>
        <h3>Categories</h3>
      </Row>
      <Form noValidate onSubmit={handleSubmit}>
        <h6>Create New Category</h6>
        <Row>
          <Col lg={6} md={6} xs={12}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                ref={categoryNameRef}
                type="text"
                placeholder="Category Name"
              />
            </Form.Group>
          </Col>

          <Col className="d-flex justify-content-center align-items-center w-25 ">
              <Button variant="success" type="submit" className="w-100">
                Add Category
              </Button>
            </Col>
        </Row>

      </Form>

      <Row className="mt-3">
         <CategoryTable />
      </Row>
    </div>
  );
};

Categories.layout = "L2";

export default Categories;
