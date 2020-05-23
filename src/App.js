import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Button, Container, Badge } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Routes from "./Routes";
import { Auth, getUserById } from "./firebase";
import "./App.css";
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';

function App(props) {
  const [user, setUser] = useState(Auth.currentUser);
  const [data, setData] = useState(null);

  Auth.onAuthStateChanged(() => setUser(Auth.currentUser));
  useEffect(() => {onLoad()}, [user]);

  async function onLoad() {
    if (Auth.currentUser)
    {
      await getUserById(Auth.currentUser.email)
      .then(d => {
        setData(d);
        console.log("data is "+d);
      })
      .catch(err => alert(err)); 
    }
  }

  return (
  <>
    <Container className="NavContainer">
    <Navbar bg="light" expand="lg" className="NavBar">
      <Navbar.Brand href="/">
        <img
        className="Logo"
        alt=""
        src="agreement.svg"
        width="30"
        height="30"
        />{' '}
        <strong className="BrandText">Metchup</strong>
      </Navbar.Brand>

        {user
        ? loggedIn()
        : notLoggedIn()}

    </Navbar>
    </Container>

    {renderRoutes()}
  </>
  );

  function renderRoutes() {
    if (data) {
      console.log("if case ");
      return <Routes {...props} userInfo={data.name} userMajor={data.major} 
    userResidence={data.residence} userIntro={data.intro} userYear={data.year} userObj={user} userEmail={Auth.currentUser.email}/>
    } else if (user) {
      console.log("else case " + user)
      return null;
    } else {
      console.log("else case " + user);
      return <Routes {...props}/>;
    }
  }

  function loggedIn() {
    return (<>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <NavbarCollapse>
        <Nav.Link href="/search" className="NavText">
          Class search
        </Nav.Link>
        <Nav.Link href="/usercenter" className="NavText">
          User center
        </Nav.Link>
        <Nav.Link href="/" onClick={() => Auth.signOut()} className="NavText">
          Logout
        </Nav.Link>
      </NavbarCollapse>

      <NavbarCollapse className="justify-content-end">
        <Link to="/message">
          <Button variant="outline-secondary">Inbox
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
