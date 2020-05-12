import React, { useState } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, Form, FormControl, Button
, Container } from "react-bootstrap";
import Routes from "./Routes";
import { Auth } from "./firebase";

function App() {
  const [isAuth, setIsAuth] = useState(Boolean(Auth.currentUser));
  Auth.onAuthStateChanged(() => setIsAuth(Boolean(Auth.currentUser)));
  return (<>
    <Container>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/"><strong>Metchup</strong></Navbar.Brand>
      <Nav className="mr-auto" pullRight>
        {isAuth
        ? loggedIn()
        : notLoggedIn()}
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Navbar>
    </Container>
    
    <Routes />
  </>);

  function loggedIn() {
    return (
      <>
        <Nav.Link href="/">Dashboard</Nav.Link>
        <Nav.Link href="/search">Class search</Nav.Link>
        <NavDropdown title="Account" id="basic-nav-dropdown">
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
