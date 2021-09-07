/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { UserData } from "../../App";
import { signedOut } from "../utils/Auth";
import "./NavBar.css";
const Headers = () => {
  const [loggenIn, setLoggenIn] = useContext(UserData);
  const location = useLocation();
  const color = location?.pathname === "/" ? "text-white" : "text-black";
  const signOut = () =>{
    signedOut()
    setLoggenIn([])
  }
  return (
    <>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/" className={`fw-bold ${color}`}>
            Shah-Riders
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={`ms-auto gap-5 ${color}`}>
              <li className="nav-item">
                <Link to="/">
                  <a className="nav-link">Home</a>
                </Link>
              </li>
              <Link to="/destination">
                <a className="nav-link">Destination</a>
              </Link>
              {loggenIn?.email ? (
                <>
                  <a className="nav-link" style={{cursor: 'pointer'}} onClick={signOut}>Sign Out</a>
                  <Nav.Link>
                    {loggenIn.fullName
                      ? loggenIn.fullName
                      : loggenIn.displayName}
                  </Nav.Link>
                </>
              ) : (
                <Link to="/login">
                  <Button className="orange-btn">Login</Button>
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Headers;
