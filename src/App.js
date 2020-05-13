import React, { useState, useEffect } from 'react';
import { Nav, Navbar, NavDropdown, Button, Container, Badge } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Routes from "./Routes";
import { Auth, getUserById } from "./firebase";
import "./App.css";
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';

function App(props) {
  const [name, setName] = useState(null);
  const [user, setUser] = useState(Auth.currentUser);

  Auth.onAuthStateChanged(() => setUser(Auth.currentUser));
  useEffect(() => {onLoad()}, [user]);

  async function onLoad() {
    if (Auth.currentUser) 
    { 
      await getUserById(Auth.currentUser.email)
      .then(data => setName(data.name))
      .catch(err => alert(err));
    }
  }

  return (<>
    <Container>
    <Navbar bg="light" expand="lg" >
      <Navbar.Brand href="/">
        <img
        alt=""
        src="agreement.svg"
        width="30"
        height="30"
        />{' '}
        <strong class="BrandText">Metchup</strong>
      </Navbar.Brand>
      
        {user
        ? loggedIn()
        : notLoggedIn()}
      
    </Navbar>
    </Container>
    
    <Routes {...props} name={name} user={user}/>
  </>);

  function loggedIn() {
    return (<>
      <Nav>
        <Nav.Link href="/search" className="NavText">Class search</Nav.Link>
        <NavDropdown title="Account" className="NavText">
          <NavDropdown.Item href="/login" onClick={() => Auth.signOut()}class="navBarText">
            Logout
          </NavDropdown.Item>
          <NavDropdown.Item href="/login" className="NavBarText">
            User center
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>

      <NavbarCollapse className="justify-content-end">
        <Link to="/message">
          <Button variant="outline-secondary">Message   
            <Badge className="MessageBadge" variant="dark"> 0 </Badge>
          </Button>
        </Link>
      </NavbarCollapse>
      </>);
  }

  function notLoggedIn() {
    return (
      <Nav>
        <Nav.Link href="/signup">Signup</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
      </Nav>
    );
  }
}

export default App;
