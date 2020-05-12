import React, { useState } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, Form, FormControl, Button
, Container } from "react-bootstrap";
import Routes from "./Routes";
import { Auth } from "./firebase";
import "./App.css";

function App(props) {
  const [isAuth, setIsAuth] = useState(Boolean(Auth.currentUser));
  Auth.onAuthStateChanged(() => setIsAuth(Boolean(Auth.currentUser)));


  return (<>
    <Container>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        <img
        alt=""
        src="agreement.svg"
        width="30"
        height="30"
        />{' '}
        <strong id="logo">Metchup</strong>
      </Navbar.Brand>
      <Nav className="Links">
        {isAuth
        ? loggedIn()
        : notLoggedIn()}
      </Nav>
    </Navbar>
    </Container>
    
    <Routes />
  </>);

  function loggedIn() {
    return (
      <>
        <Nav.Link href="/search">Class search</Nav.Link>
        <NavDropdown title="Account">
          <NavDropdown.Item href="/login" onClick={() => Auth.signOut()}>Logout</NavDropdown.Item>
          <NavDropdown.Item href="/login">User center</NavDropdown.Item>
        </NavDropdown>
      </>);
  }

  function notLoggedIn() {
    return (
      <>
        <Nav.Link href="/signup">Signup</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
      </>
    );
  }
}

export default App;
