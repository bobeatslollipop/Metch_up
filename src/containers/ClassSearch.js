import React from "react";
import { ListGroup, ListGroupItem, Row, Col, Button, Container, FormControl, InputGroup, Alert } from "react-bootstrap";
import data from "../data/4770/courses.json";
import { useState } from 'react';
import "./ClassSearch.css";
import { Auth, addClassToUser } from "../firebase";

export default function ClassSearch(props) {

  const [input, setInput] = useState(null);


  function includes(course){
    return (
    course.title && course.title.toLowerCase().includes(input.toLowerCase()))
    || (course.subject && course.subject.toLowerCase().includes(input.toLowerCase()))
    || (course.catalog_num && course.catalog_num.toLowerCase().includes(input.toLowerCase()))
    || (course.topic && course.topic.toLowerCase().includes(input.toLowerCase()))
    || (course.instructor && course.instructor.toLowerCase().includes(input.toLowerCase()));
  }
  const elementStyle = {
    borderRadius:'10px',
    position:'relative',
    marginTop:'5px',
    marginBottom:'10px'
  }
  const courses = data.filter(course => {
    return !input || (course && includes(course));
  })
  .slice(0,25)
  .map(course => {
    return(
    <ListGroupItem  key={(course.id).toString()} className="Course" style={elementStyle}>
      <Row>
          <Col className="course-info" sm={9}>
              <h4 className="course-title"><strong>{course.subject} {course.catalog_num}</strong>: {course.title} </h4>
              <h5 className="course-name">{course.topic}</h5>
              <h6 className="course-term">{course.termId}</h6>
              <h6 className="course-instructor">{course.instructor}</h6>
              <h6 className="course-section"> Section {course.section}</h6>
          </Col>
          <Col sm={3}>
            <Button variant="outline-primary" 
            onClick={() => addClassToUser(course.id.toString(), Auth.currentUser.email)} block>
              Add to Dashboard
            </Button>
          </Col>
        </Row>
    </ListGroupItem>
    )
  });

  var search_text = "These are the first 25 results containing '" + input + "'. Please narrow your search.";
  if (courses.length && courses.length < 25) {
    search_text = courses.length + " results. "
  } else if (courses.length === 0) {
    search_text = "No result."
  }

  return (
    <Container>
      <ListGroup>
        <InputGroup className="Search">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={e => setInput(e.target.value)}
            placeholder="Enter keywords"
          />
        </InputGroup>
        {courses}
        <Alert variant="dark" style={{textAlign: "center", borderRadius: "10px"}}>{search_text}</Alert>
      </ListGroup>
    </Container>
  );
}
