import React, { useState } from "react";
// Has All Of SideBar Values
import { sideBarValues } from "@/Utilities/sideBarValues";
import {
  Col,
  Row,
  Navbar,
  Button,
  Container,
  Nav,
  Offcanvas,
  ListGroup,
} from "react-bootstrap";
import Image from "next/image";
import LoadingSpinner from "@/Components/UI/LoadingSpinner";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const NavBar = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const signOutHandler = async () => {
    await signOut({ callbackUrl: "/" });
  };

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  const activeButton = "bg-white text-black";
  const inActiveButton = " text-white";

  return (
    <>
      <div style={{ display: "flex" }}>
        <Col
          md={2}
          style={{ backgroundColor: "#1D1D42" }}
          className="d-none d-md-block  d-lg-block rounded-right"
        >
          <h2 className="d-flex justify-content-center align-items-center text-white mt-3">E-Commerce</h2>
          <ListGroup style={{height : "100vh"}} variant="flush" as="ul" className="w-100">
            {sideBarValues.map((item) => {
              return (
                <div key={item.title}>
                  <Link href={item.path}>
                    <ListGroup.Item
                      as="li"
                      className={
                        router.pathname === item.path
                          ? activeButton
                          : inActiveButton
                      }
                      style={{
                        backgroundColor: "#1D1D42",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        fontFamily : "Cairo"
                      }}
                    >
                      <item.icon className="d-xs fs-4 me-2 " />
                      <span className="fs-5 fw-semibold" >{item.title}</span>
                    </ListGroup.Item>
                  </Link>
                </div>
              );
            })}
            <div className="d-flex justify-content-center align-items-center">
              <Button
                variant="danger"
                className="me-1 my-5 w-50"
                onClick={signOutHandler}
              >
                Log Out
              </Button>
            </div>
          </ListGroup>
        </Col>

        <div style={{ padding: 10, width: "100%" }}>
          {["sm"].map((expand) => (
            <Navbar key={expand} expand="md" className=" bg-body-tertiary mb-3">
              <Container fluid className="d-flex" >
                <div className="d-flex justify-content-center align-items-center overflow-hidden" >
                  <Navbar.Toggle
                    className="h-25"
                    aria-controls={`offcanvasNavbar-expand-${expand}`}
                  />
                  <Navbar className="overflow-hidden">
                    <div className="d-flex justify-content-center align-items-center ">
                      <Navbar.Brand className="ms-3">
                        Hello,{" "}
                        <Image
                          className="rounded-circle"
                          src={session?.user?.image}
                          width={35}
                          height={35}
                          alt="Profile Picture"
                        />
                        <span className="fs-5 fw-bold ms-1 ">
                          {session?.user?.name}
                        </span>
                      </Navbar.Brand>
                    </div>
                  </Navbar>
                </div>
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="start"
                  style={{ width: "200px" }}
                  className="rounded"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title
                      id={`offcanvasNavbarLabel-expand-${expand}`}
                    >
                      E-Commerce
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body
                    style={{ backgroundColor: "#1D1D42" }}
                    className="d-sm-block d-md-none "
                  >
                    <ListGroup variant="flush" as="ul" className="w-100">
                      {sideBarValues.map((item) => {
                        return (
                          <div key={item.title}>
                            <Link href={item.path}>
                              <ListGroup.Item
                                as="li"
                                className={
                                  router.pathname === item.path
                                    ? activeButton
                                    : inActiveButton
                                }
                                style={{
                                  backgroundColor: "#1D1D42",
                                  border: "none",
                                  display: "flex",
                                  alignItems: "center",
                                  borderRadius: "50px",
                                }}
                              >
                                <item.icon className="fs-4 me-2" />
                                <span className="fs-5 fw-semibold" style={{fontFamily : 'Cairo !important'}}>
                                  {item.title}
                                </span>
                              </ListGroup.Item>
                            </Link>
                          </div>
                        );
                      })}
                      <div className="d-flex justify-content-center align-items-center">
                        <Button
                          variant="danger"
                          className="me-1 my-5 w-100"
                          onClick={signOutHandler}
                        >
                          Log Out
                        </Button>
                      </div>
                    </ListGroup>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          ))}

          <div >{children}</div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
