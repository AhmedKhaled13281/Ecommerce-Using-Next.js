import React, { useState, useRef } from "react";
import { Button, Col, Row, Container, Form } from "react-bootstrap";
const Categories = () => {
  const categoryNameRef = useRef()
  const [dropDownValue , setDropDownValue] = useState()
  const [arrayOfProperties, setArrayOfProperties] = useState([]);

  const handlePropertiesInput = (e, index) => {
    const { name, value } = e.target;
    const newArray = [...arrayOfProperties];
    newArray[index][name] = value;
    setArrayOfProperties(newArray);
  };

  const handleDropDownInput = (e) => {
    setDropDownValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const categoryNameValue = categoryNameRef.current.value
    const data = {
      categoryName : categoryNameValue,
      dropDownValue,
      arrayOfProperties
    };

    //console.log(Object.values(data))
    if(Object.values(data).every(Boolean) && data.arrayOfProperties[0]["propertyName"] && data.arrayOfProperties[0]["propertyValue"]){

      console.log(data);
    }
  };

  const addProp = () => {
    const newData = {
      propertyName: "",
      propertyValue: "",
    };

    setArrayOfProperties((prev) => [...prev, newData]);
  };

  const deleteProp = (index) => {
    const newArray = [...arrayOfProperties];
    newArray.splice(index, 1);
    setArrayOfProperties(newArray);
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
              <Form.Control ref={categoryNameRef} type="text" placeholder="Category Name" />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Select onChange={handleDropDownInput}>
                <option>No Parent Category</option>
                <option>Mobiles</option>
                <option>TVs</option>
                <option>Cameras</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} className="mb-3">
            <h6>Property Name</h6>
            <Button onClick={() => addProp()}>Add New Property</Button>
          </Col>
          <div>
            {arrayOfProperties.length > 0 &&
              arrayOfProperties?.map((prop, index) => (
                <div key={index}>
                  <Row className="mb-3">
                    <Col>
                      <Form.Control
                        name="propertyName"
                        type="text"
                        placeholder="Name"
                        onChange={(e) => handlePropertiesInput(e, index)}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        name="propertyValue"
                        type="text"
                        placeholder="Value"
                        onChange={(e) => handlePropertiesInput(e, index)}
                      />
                    </Col>
                    <Col>
                      <Button variant="danger" onClick={() => deleteProp(index)}>Delete</Button>
                    </Col>
                  </Row>
                </div>
              ))}
            <Col>
              <Button variant="success" type="submit">
                Save
              </Button>
            </Col>
          </div>
        </Row>
      </Form>
    </div>
  );
};

export default Categories;
Categories.layout = "L2";
