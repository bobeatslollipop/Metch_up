import React, { useState, useEffect } from "react";
import { Modal, Button, Col, ListGroup, Container} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { getUserByClass } from "../firebase"




export default function ClassModal(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [list, setList] = useState(null);
    useEffect(() => {onLoad()}, []);

    async function onLoad() {
      await getUserByClass(props.id)
      .then(data => (data.length == 1)?
      setList(
          <ListGroup.Item key="nothing">
            <strong>No Available Classmate at this point :(</strong>
          </ListGroup.Item>
      )
      :setList(
        data
        .filter(user => user.id !== props.userId)  //filter the array without current user
        .map((user) => 
        <LinkContainer to={{pathname:"/message", aboutProps: user.id}}>
          <ListGroup.Item key={user.id}>
            {user.id}
          </ListGroup.Item>
        </LinkContainer>)
        ))
      .catch(err => alert(err));
    }
 

    return (
        <>
          <Button block variant="outline-primary" onClick={handleShow}>
            {props.name}
          </Button>
         
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{props.name} Class Info</Modal.Title>
            </Modal.Header>
              <Modal.Body>
                <Container><p>Find a partner from the list below.</p></Container>
                <ListGroup>
                  {list}
                </ListGroup>               
              </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="outline-primary" onClick={handleClose}>
                Join the group
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}