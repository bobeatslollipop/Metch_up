import React, { useState, useEffect } from "react";
import { Modal, Button, Col, ListGroup, Container, InputGroup, FormControl} from "react-bootstrap";
import { db } from "../firebase"



// pass in message id 
export default function ViewMessage(props) {
  
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [message, setMessage] = useState(null);



    useEffect(() => {onLoad()}, []);

    async function onLoad() {
        var content;
        await db.collection("Message").doc(props.id).get().then(function(doc) {
            content = doc;
          }).catch(err => alert(err));

        setMessage(content);


    }



    return (
        <>
          <Button block variant="outline-primary" onClick={handleShow}>
            {"View"}
          </Button>
      
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{props.conent} message</Modal.Title>
            </Modal.Header>
              <Modal.Body>
                 {message}            
              </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}