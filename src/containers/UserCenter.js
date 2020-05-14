import React, { useState, useEffect } from "react";
import { Col, Row, Tab, Nav, Container, Jumbotron, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import "./UserCenter.css";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "../firebase";

export default function UserCenter(props) {
  //Any ideas what to put here?
  //Username, Dorm, ClassYear, Major, Introduction
  function CreatorInfo(props){
    return(
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body>
              <Card.Title>{props.name}</Card.Title>
              <Card.Text>
                Creator of the Metchup.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>WCAS 23'</ListGroupItem>
              <ListGroupItem>Major:Computer Science</ListGroupItem>
              <ListGroupItem>Frontend developer</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Card.Link href="">Github</Card.Link>
              <Card.Link href="https://www.linkedin.com/in/zrsu/" target="_blank">Linkedin</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body>
              <Card.Title>{props.name}</Card.Title>
              <Card.Text>
                Creator of the Metchup.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>WCAS 23'</ListGroupItem>
              <ListGroupItem>Major:Computer Science</ListGroupItem>
              <ListGroupItem>Frontend developer</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Card.Link href="#">Github</Card.Link>
              <Card.Link href="#">Linkedin</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body>
              <Card.Title>{props.name}</Card.Title>
              <Card.Text>
                Creator of the Metchup.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>WCAS 23'</ListGroupItem>
              <ListGroupItem>Major:Computer Science</ListGroupItem>
              <ListGroupItem>Frontend developer</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Card.Link href="#">Github</Card.Link>
              <Card.Link href="#">Linkedin</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    )
  }

  return (
    <Container>
      <Jumbotron className="UserCenter">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3} className="NavList">
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">User Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second" >Account Settings</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third" >About Us</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  Hello
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  What
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <CreatorInfo name="First Person"></CreatorInfo>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Jumbotron>
    </Container>
  );
}
