import React, { useState, useEffect } from "react";
import { Col, Row, Tab, Nav, Container, Jumbotron } from "react-bootstrap";
import "./UserCenter.css";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "../firebase";

export default function UserCenter(props) {
  //Any ideas what to put here?
  //Username, Dorm, ClassYear, Major, Introduction

  return (
    <Container>
      <Jumbotron className="UserCenter">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
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
                  Northwestern University
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Jumbotron>
    </Container>
  );
}
