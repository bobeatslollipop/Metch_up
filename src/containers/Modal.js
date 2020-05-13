import React, { useState, useEffect } from "react";
import { Modal, Button, Col } from "react-bootstrap";
import { getUserByClass } from "../firebase"




export default function ClassModal(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [list, setList] = useState(null);
    useEffect(() => {onLoad()}, []);
    async function onLoad() {
      await getUserByClass(props.id)
      .then(data => setList(
        data
        .filter(user => user.id != props.userId)  //filter the array without current user
        .map((user) => <p>{user.id}</p>)
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
                {list}
              </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Join the group
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}