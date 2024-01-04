import React, { useState } from "react";
// Has All Of SideBar Values
import { sideBarValues } from "@/Utilities/sideBarValues";
import { Col, Navbar, Button, ListGroup } from "react-bootstrap";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const NavBar = ({ children }) => {
  const { data: session, status } = useSession();
  const [show, setShow] = useState(true);
  const router = useRouter();

  const signOutHandler = async () => {
    await signOut({ callbackUrl: "/" });
  };

  if (status === "loading") {
    return <p>Loading or not authenticated...</p>;
  }

  const handleShow = () => setShow((prevState) => !prevState);
  const activeButton = "bg-white text-black";
  const inActiveButton = " text-white";

  return (
    <>
      <div
        className="d-flex align-items-stretch pb-3"
        style={{ width: "100%", height: "100%" }}
      >
        {show && (
          <>
            <Col
              lg={show ? 2 : 0}
              md={show ? 4 : 0}
              xs={show ? 6 : 0}
              style={{ minHeight: "100dvh" }}
            >
              <Navbar
                className="d-flex justify-content-start flex-column"
                style={{
                  backgroundColor: "#1D1D42",
                  color: "white",
                  height: "100%",
                  overflow: "hidden",
                }}
              >
                {/* Add your sidebar content here */}
                <Navbar.Brand
                  className="text-light pb-4 border-bottom border-black text-center"
                  style={{ width: "100%" }}
                >
                  E-commerce
                </Navbar.Brand>

                <ListGroup
                  style={{ backgroundColor: "#1D1D42" }}
                  variant="flush"
                  as="ul"
                  className="w-100"
                >
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
                            }}
                          >
                            <item.icon className="fs-4 me-2" />
                            <span className="fs-5 fw-semibold">
                              {item.title}
                            </span>
                          </ListGroup.Item>
                        </Link>
                      </div>
                    );
                  })}
                </ListGroup>
              </Navbar>
            </Col>
          </>
        )}

        <Col>
          <Navbar
            collapseOnSelect
            expand="lg"
            className="d-flex justify-content-between  position-sticky"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <div className="d-flex justify-content-center align-items-center ">
              <RxHamburgerMenu
                style={{ fontSize: "30px" }}
                onClick={handleShow}
              />

              <Navbar.Brand className="ms-3">
                Hello,{" "}
                <Image
                  className="rounded-circle"
                  src={session?.user?.image}
                  width={35}
                  height={35}
                  alt="Profile Picture"
                />
                <span className="fs-4 fw-bold ms-1">{session?.user?.name}</span>
              </Navbar.Brand>
            </div>

            <div>
              <Button
                variant="danger"
                className="me-1"
                onClick={signOutHandler}
              >
                Log Out
              </Button>
            </div>
          </Navbar>
          <div>{children}</div>
        </Col>
      </div>
    </>
  );
};

export default NavBar;
