import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

const AppNavbar = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/">TeamWork</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/feeds">Feeds</Nav.Link>
            <Nav.Link
              href="/login"
              onClick={() => {
                sessionStorage.removeItem("user_payload");
              }}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;
