import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import NavDropdown from "react-bootstrap/NavDropdown";

import React, { useState } from "react";

import logo from "../../public/images/scrum.png";
import { FaUserCircle } from "react-icons/fa";


function Navigation() {
/* const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <span style={{ marginRight: "130px" }}>
      <FaUserCircle style={{ fontSize: "40px", color: "white", display: "inline-block" }} />
    </span>
  </a>
)); */

  return (
    <>
      <Navbar className="bg-blue-600">
        <Navbar.Brand href="#home">
          <img className="w-10 ml-16" src={logo.src}></img>
        </Navbar.Brand>
     {/*    <Navbar.Collapse className="justify-end">
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components"></Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="1">Home</Dropdown.Item>
              <Dropdown.Item eventKey="2">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse> */}
      </Navbar>
    </>
  );
};

export default Navigation;
