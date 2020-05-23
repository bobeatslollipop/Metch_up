import React, { useState, useEffect } from "react";
import { Col, Row, Tab, Nav, Container, Jumbotron, Card, ListGroup, Form, Button, CardDeck } from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import "./UserCenter.css";
import { Auth, changeUserMajor, changeUserIntro, changeUserResidence } from "../firebase";

export default function UserCenter(props) {
  //Username, Dorm, ClassYear, Major, Introduction

  return (
    <Container>
      <Jumbotron style={{marginTop: "25px"}} className="UserCenter">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3} className="NavList" style={{height: "85%"}}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">User Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second" >Placeholder</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third" >About Us</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Profile/>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  What
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <CreatorInfo name="Zhuoran Su"/>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Jumbotron>
    </Container>
  );

  function Profile() {
    const [major, setMajor] = useState(null);
    const [intro, setIntro] = useState(null);
    const [residence, setResidence] = useState(null);
    const [year, setYear] = useState(null);
    const [zip, setZip] = useState(null);
    function handleSubmit(e){
      var msg="";
      if (major != null){
        console.log(major);
        changeUserMajor(props.userEmail, major);
        msg = msg + "Major ";
      }
      if (intro != null){
        console.log(intro);
        changeUserIntro(props.userEmail, intro);
        msg = msg + "Intro "
      }
      if (residence != null){
        console.log(residence);
        changeUserResidence(props.userEmail, residence);
        msg = msg + "Residence "
      }
      if (year != null){
        console.log(year);
      }
      if (zip != null){
        console.log(major);
      }
      if (msg!=""){
        alert(msg + "Updated");
      } else {
        alert("Nothing Updated");
        e.preventDefault();
      }

    }

    return(
      <Container style={{backgroundColor:"white", borderRadius:"15px", padding: "15px"}}>
        <Container style={{textAlign: "center"}}>
          <p><strong>User Profile</strong></p>
        </Container>
        <hr></hr>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" disabled/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" disabled/>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridMajor">
            <Form.Label>Major</Form.Label>
            <Form.Control 
            placeholder={props.userMajor} 
            onChange={e=>{setMajor(e.target.value);}}
            />
          </Form.Group>

          <Form.Group controlId="formGridIntroduction">
            <Form.Label>Introduce Yourself</Form.Label>
            <Form.Control 
            placeholder={props.userIntro}
            onChange={e=>{setIntro(e.target.value);}}
             />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridResidence">
              <Form.Label>Dorm/Residence</Form.Label>
              <Form.Control 
              placeholder={props.userResidence}
              onChange={e=>{setResidence(e.target.value);}}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridYear">
              <Form.Label>Year</Form.Label>
              <Form.Control 
              placeholder={props.userYear}
              onChange={e=>{setYear(e.target.value);}}
              disabled
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>What to put here?</Form.Label>
              <Form.Control 
              disabled/>
            </Form.Group>
          </Form.Row>

          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>

          <Button 
          variant="primary" 
          type="submit"
          onClick={e =>{handleSubmit(e)}}>
            Submit
          </Button>
        </Form>
      </Container>
    );
  }

  function CreatorInfo(prop){
    return(
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body>
              <Card.Title>{prop.name}</Card.Title>
              <Card.Text>
                Testing Metchup Functions.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>WCAS 23' Computer Science</ListGroup.Item>
              <ListGroup.Item>Full-stack developer</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Card.Link href="https://github.com/ZhuoranS" target="_blank">Github</Card.Link>
              <Card.Link href="https://www.linkedin.com/in/zrsu/" target="_blank">Linkedin</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body>
              <Card.Title>Tony Luo</Card.Title>
              <Card.Text>
                Creator of the Metchup.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>WCAS 23'</ListGroup.Item>
              <ListGroup.Item>Major:Computer Science</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Card.Link href="https://github.com/tonyluozn">Github</Card.Link>
              <Card.Link href="https://www.linkedin.com/in/tony-luo-429383152/">Linkedin</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body>
              <Card.Title>Bob Guo</Card.Title>
              <Card.Text>
                Creator of the Metchup.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>WCAS 23'</ListGroup.Item>
              <ListGroup.Item>Major:Computer Science</ListGroup.Item>
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
}
