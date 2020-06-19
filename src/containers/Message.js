import React, {useState,useEffect } from "react";
import { Jumbotron,Form,Container, ListGroup, Col, Row, Button } from "react-bootstrap";

import { Link } from 'react-router-dom';
import { db,getUserByClass,getUserById, getMessagesByUser, getInvitationsByUser } from "../firebase";
import "./Message.css";
import ViewMessage from "./ViewMessage";

export default function Message(props) {
//props:   sender,receiver 

  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //from app.js, show mail list.
  //from Modal.js, show message form.
  var showlist = false;
  const [mails, setMails] = useState(null);
  const [inbox, setInbox] = useState([]);

  //sender passed by App.js
  //sendTo passed by Modal.js
  const sender = props.userEmail;
  //change sender to email later 
  const sendTo = props.location.aboutProps;
  const inviting = props.location.isInvitingProps;

  var text = "Send";

  console.log(inviting);

  if (inviting){
    console.log("inviting "+sendTo);
    text="Invite";
  } else if (sendTo){
    console.log("from class modal, the receiver is: "+sendTo);
  } else {
    showlist = true;
    console.log("Not from the class modal.");
  }

  //load the mail list, get all classmates from all the enrolled classess
  useEffect(() => {onLoad()}, []);
  async function onLoad() {
    var classes = [];
    await getUserById("tonyluo2023@u.northwestern.edu")
    .then(data => {
      classes = data.classes;
      console.log("classes loaded in message with "+classes.length);
      
    }).catch(err => alert(err));

    // array of user object
    var a = [];
    
    // await Promise.all(classes.map(async (clsId) =>{ 
    //   console.log("im here!!!!!");
    //   await getUserByClass(clsId)
    //   .then(data => {
    //     setUsers(data);
    //     a = a.concat(users);  
    //   }).catch(err => alert(err));
    // }));
    console.log("classes length is "+classes.length);
    for(let i =0;i<classes.length;i++){
      console.log("add class id "+classes[i]+"to the list.");
      var users = [];
      await getUserByClass(classes[i])
      .then(data => {
        users = data;
      }).catch(err => alert(err));
      a = a.concat(users); 
      console.log(a); 
    }
    
    function msgParse(str){
      var result = "";
      if (str.length >=25) {
        result = str.substring(0,25)+"...";
        return result;
      }
        return str;
    }

    function nameParse(str){
      var at = str.indexOf("@");
      return str.substring(0,at);
    }

    setMails(
      a 
      .filter((user, index) =>  index == a.indexOf(user))
      .filter(user => user !== sender)
      .map((user) => 
      <ListGroup.Item key={user}>
        <Row>
          <Col md={2} style={{ display: "flex"}}>
            <Container style={{ display: "flex", alignItems:"center" }}>
            {nameParse(user)} 
            </Container>
          </Col>
          <Col md={{ span: 2, offset: 4 }} style={{ display: "flex"}}>
          <Link to={{pathname:"/message", aboutProps: user}}>
            <Button variant="outline-dark">Message</Button>
          </Link>
          
          </Col>
        </Row>
      </ListGroup.Item>)
      )


      var messages = [];
      var invitations = [];
      await getMessagesByUser(sender)
          .then(data => {
            //setMessages(data);
            messages = data;
            console.log("inbox messages loaded in message ");
          }).catch(err => alert(err));
      
      await getInvitationsByUser(sender)
        .then(data => {
          //setMessages(data);
          invitations = data;
          console.log("invitations loaded in message ");
        }).catch(err => alert(err));

      console.log("how many invitations? " +invitations.length);
      console.log("how many messages? " +messages.length);

      setInbox(
        messages.map((message) =>
        <ListGroup.Item key={message.id}>
          <Row>
            <Col md={3} style={{ display: "flex"}}>
              <Container style={{ display: "flex", alignItems:"center", textOverflow: "ellipsis"}}> <strong>{nameParse(message.data().idFrom)}</strong></Container>
              {console.log("inbox message from: "+message.data().idFrom)}
            </Col>
            <Col md={5} style={{ display: "flex"}}>
              <Container style={{ display: "flex", alignItems:"center" }}>{msgParse(message.data().content)}</Container>
            </Col>
            <Col md={2}>
              <ViewMessage key={message.id} id={message.id}/>
            </Col>
            <Col md={2}>
            <Link to={{pathname:"/message", aboutProps: message.data().idFrom}}>
              <Button variant="outline-dark">Reply</Button>
            </Link>
            </Col>
          </Row>
      </ListGroup.Item>
        )
      )


  }

//fix later, after we can get user's email from app.js.


  async function handleSubmit(event) {
    event.preventDefault();
    if (content.trim() === '') {
        return
    }
    if(inviting){
      setIsLoading(true);

    db.collection("Invitations").doc().set({
        content: content.trim(),
        //fix later 
        idFrom: sender,
        idTo: sendTo, 
        time:  ''//timestamp

    }).then(() => {
        console.log("User '" +sender + "' sent invitation'" + sendTo +"'message"+content);
        props.history.push("/");
    })
    .catch(e => {
        console.error("Error storing data; " + e);
        alert(e);
        setIsLoading(false);
    });
    }else{
    // const timestamp = moment()
    //    .valueOf()
    //    .toString()

    setIsLoading(true);

    db.collection("Messages").doc().set({
        content: content.trim(),
        //fix later 
        idFrom: sender,
        idTo: sendTo, 
        time:  ''//timestamp

    }).then(() => {
        console.log("User '" +sender + "' sent '" + sendTo +"'message"+content);
        props.history.push("/");
    })
    .catch(e => {
        console.error("Error storing data; " + e);
        alert(e);
        setIsLoading(false);
    });
  }
  }


  function renderMails(){
    return (
      <Container class="Mail">
        <Jumbotron style={{marginTop: "25px"}} className="UserCenter">
        <Row>
          <Col md="auto" className="mails" style={{height: "85%"}}>
          <div class="Mail">
              <h4 class="list">Your Classmates </h4>
            </div>
            <ListGroup>
              {mails}
            </ListGroup>
          </Col>  
          <Col>
            <Row>
            <h4>Inbox</h4>
            </Row>
            <Row>
              <div class="Inbox">
                <ListGroup>
                  {inbox}
                </ListGroup>
              </div>
            </Row>
            <Row>
            <h4> Invitations</h4>
            </Row>
            <Row>
              <div class="invitations">
                <ListGroup>
                  {inbox}
                </ListGroup>
              </div>
            </Row>
            
          </Col>
        </Row>
        </Jumbotron>
      </Container>

    );
  }

  
  function renderForm(){
    return (
      <div class="User">
        <div class="user-info">
          <h5 class="course-title">Sender: {sender} </h5>
          <h5 class="course-title">Receiver: {sendTo} </h5>
        {// Display reciever's name, other info, and classes 
        }
        </div>

        <form onSubmit={handleSubmit}>
        <Form.Group controlId="content">
          <Form.Control
            value={content}
            componentClass="textarea"
            onChange={e => setContent(e.target.value)}
          />
        </Form.Group>
        <Button
          block
          type="submit"
          variant={inviting?'info':'primary'}
          isLoading={isLoading}>
          {text}
        </Button>
        </form>
      </div>
      );
  }

  return (
    <Container className="Message">
      {showlist ? renderMails() : renderForm()}

    </Container>
  );
}