import React from "react";
import { Row, Col } from "react-bootstrap";
import useSWR from "swr";
import LoadingSpinner from "@/Components/UI/LoadingSpinner";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const AdminDashboard = () => {
  const { data: products } = useSWR("/api/products/productApi", fetcher);
  const { data: categories } = useSWR("/api/categories/categoryApi", fetcher);
  const { data: users } = useSWR("/api/users/usersApi", fetcher);

  if (!products || !categories || !users) {
    return <LoadingSpinner />;
  }

  const listOfNumbers = [
    {
      name: "Number Of Products",
      mount: products?.length,
    },
    {
      name: "Number Of Users",
      mount: categories?.length,
    },
    {
      name: "Number Of Categories",
      mount: users?.length,
    },
  ];

  return (
    <div>
      <Row
        className="d-flex flex-wrap justify-content-around p-2 fw-bold w-100"
        style={{ fontFamily: "Cairo " }}
      >
        {listOfNumbers.map((item, index) => (
          <Col md={4} xs={12} key={index}>
            <div
              className="p-3 border border-light-subtle rounded m-3"
              style={{ boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px` }}
            >
              <p className="text-center">{item.name}</p>
              <h1 className="text-center" style={{ color: "#1D1D42" }}>
                {item?.mount}
              </h1>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

AdminDashboard.layout = "L2";

export default AdminDashboard;
