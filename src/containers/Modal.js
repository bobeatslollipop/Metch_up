import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Col, ListGroup, Container, InputGroup, FormControl, Overlay, Tooltip} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from 'react-router-dom';
import { getUserByClass } from "../firebase"




export default function ClassModal(props) {
  
    const [show, setShow] = useState(false);
    const [invite, setInvite] = useState(false);
    const [tipShow, setTipShow] = useState(false);
    const [list, setList] = useState(null);
    const [groupInfo, setGroupInfo] = useState(null); //Acquire group infos
    const [inGroup, setInGroup] = useState(false);
    const target = useRef(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleInvite = () => setInvite(!invite);
    const handleChangeState = () => setInGroup(!inGroup);

    useEffect(() => {onLoad()}, [invite]);

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
          .filter(user => user !== props.userId)  //filter the array without current user
          .map((user) => 
          <>
            <LinkContainer key={user} to={{isInvitingProps:invite, pathname:"/message", aboutProps: user}}>
              <ListGroup.Item >
                {user}
              </ListGroup.Item>
            </LinkContainer>
          </>)
        )
      )
        .catch(err => alert(err));
    }

    function GroupView(props){
      const [w2m, setW2MLink]=useState("When to Meet Link");
      const [zoom, setZoomLink]=useState("Zoom Link");
      function handleW2MSubmit(){
        console.log(w2m);
      }

      function handleZoomSubmit(){
        console.log(zoom);
      }
      return(
        <Container>
          <p>Connect with your partners!</p>
          <ListGroup variant="flush">
            <ListGroup.Item key="w2m">
              <InputGroup>
                <FormControl
                  defaultValue={w2m}
                  onChange={e=>setW2MLink(e.target.value)}
                />
                <InputGroup.Append>
                  <Button variant="outline-primary" onClick={handleW2MSubmit}>Post</Button>
                </InputGroup.Append>
              </InputGroup>
            </ListGroup.Item>
            <ListGroup.Item key="zoom">
              <InputGroup>
                <FormControl
                  defaultValue={zoom}
                  onChange={e=>setZoomLink(e.target.value)}
                />
                <InputGroup.Append>
                  <Button variant="outline-primary" onClick={handleZoomSubmit}>Post</Button>
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
              <Button variant="outline-primary" ref={target} onClick={()=>{handleInvite(); setTipShow(invite? false:!tipShow);}} active={invite}>
                Send Invitation
              </Button>
              <Overlay target={target.current} show={tipShow} placement="bottom" rootClose={true} rootCloseEvent="click" onHide={() => setTipShow(!tipShow)}>
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    <p>Click over the names to invite. </p>
                    <Container>Click me again to exit invite mode.</Container>
                  </Tooltip>
                )}
              </Overlay>
              <Button variant="outline-info" onClick={handleChangeState}>
                Alter Status
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

//<Link to={{pathname:"/message"}}>