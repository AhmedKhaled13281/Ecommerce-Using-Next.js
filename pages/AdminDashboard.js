import React from "react";
import { Container, Row, Col, Card, Nav, Navbar } from "react-bootstrap";
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const AdminDashboard = () => {
  const {data : products} = useSWR('/api/products/productApi' , fetcher)
  const {data : categories} = useSWR('/api/categories/categoryApi' , fetcher)
  const {data : users} = useSWR('/api/users/usersApi' , fetcher)

  if(!products || !categories && !users){
   return  (
      <div>Loading ...</div>
      )
  }

  return (
    <div>
      <Row className="d-flex flex-wrap justify-content-around p-2 fw-bold w-100" style={{fontFamily : "Cairo "}}>
        <Col md={4} xs={12}>
          <div
            className="p-3 border border-light-subtle rounded"
            style={{ boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px` }}
          >
            <p className="text-center" >Number Of Products</p>
            <h1 className="text-center" style={{ color: "#1D1D42" }}>
              {products?.length}
            </h1>
          </div>
        </Col>
        <Col md={4} xs={12}>
          <div
            className="p-3 border border-light-subtle rounded"
            style={{ boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px` }}
          >
            <p className="text-center">Number Of Users</p>
            <h1 className="text-center" style={{ color: "#1D1D42" }}>
              {users?.length}
            </h1>
          </div>
        </Col>
        <Col md={4} xs={12}>
          <div
            className="p-3 border border-light-subtle rounded"
            style={{ boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px` }}
          >
            <p className="text-center">Number Of Categories</p>
            <h1 className="text-center" style={{ color: "#1D1D42" }}>
              {categories?.length}
            </h1>
          </div>
        </Col>
      </Row>
    </div>
  );
};

AdminDashboard.layout = "L2";

export default AdminDashboard;
