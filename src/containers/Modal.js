import React, { useState, useEffect } from "react";
import { Modal, Button, Col, ListGroup, Container, InputGroup, FormControl} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { getUserByClass } from "../firebase"




export default function ClassModal(props) {
  
    const [show, setShow] = useState(false);
    const [list, setList] = useState(null);
    const [groupInfo, setGroupInfo] = useState(null); //Acquire group infos
    const [inGroup, setInGroup] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleChangeState = () => setInGroup(!inGroup);

    useEffect(() => {onLoad()}, []);

    async function onLoad() {
      await getUserByClass(props.id)
      .then
      (
        data => (data.length == 1)?
        setList
        (
            <ListGroup.Item key="nothing">
              <strong>No Available Classmate :(</strong>
            </ListGroup.Item>
        )
      :
        setList
        (
          data
          .filter(user => user.id !== props.userId)  //filter the array without current user
          .map((user) => 
          <LinkContainer key={user.id} to={{pathname:"/message", aboutProps: user.id}}>
            <ListGroup.Item >
              {user.id}
            </ListGroup.Item>
          </LinkContainer>)
        )
      )
        .catch(err => alert(err));
    }

    function GroupView(props){
      return(
        <Container>
          <p>Connect with your partners!</p>
          <ListGroup variant="flush">
            <ListGroup.Item key="w2m">
              <InputGroup>
                <FormControl
                  defaultValue="When to Meet Link"
                />
                <InputGroup.Append>
                  <Button variant="outline-primary">Post</Button>
                </InputGroup.Append>
              </InputGroup>
            </ListGroup.Item>
            <ListGroup.Item key="zoom">
              <InputGroup>
                <FormControl
                  defaultValue="Zoom Link"
                />
                <InputGroup.Append>
                  <Button variant="outline-primary">Post</Button>
                </InputGroup.Append>
              </InputGroup>
            </ListGroup.Item>
            <ListGroup.Item key="message">
              <Button variant="outline-primary" block>{"\uFF0B"}Message</Button>
            </ListGroup.Item>
          </ListGroup>
        </Container>

      );
    }

    function PeerView(props){
      return(
        <>
          <Container><p>Find a partner from the list below.</p></Container>
          <ListGroup>
            {list}
          </ListGroup> 
        </> 
      );
    }
    
    function ModalView(props){
      if (inGroup){
        return(
          <GroupView></GroupView>
        );
      } else {
        return(
          <PeerView></PeerView>
        );
      }
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
                <ModalView></ModalView>            
              </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="outline-primary" onClick={handleClose}>
                Send Invitation
              </Button>
              <Button variant="outline-info" onClick={handleChangeState}>
                Alter Status
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}