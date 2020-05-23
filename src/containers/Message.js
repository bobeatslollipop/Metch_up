import React, {useState,useEffect } from "react";
import { Form,Container, ListGroup, Col, Row, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from 'react-router-dom';
import { db,getUserByClass,getUserById, getMessagesByUser } from "../firebase";
import "./Message.css";

export default function Message(props) {
//props:   sender,reciever 

  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //from app.js, show mail list.
  //from Modal.js, show message form.
  var showlist = false;
  const [mails, setMails] = useState(null);
  const [inbox, setInbox] = useState([]);




  //sender passed by App.js
  //sendTo passed by Modal.js
  const sender = props.userInfo;
  //change sender to email later 
  const sendTo = props.location.aboutProps;
  if (sendTo){
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
      }
  

    setMails(
      a 
      // temporary  example!!!!  replace with 'a' above, replace {user.id} below
      .filter(user => user.id !== "tonyluo2023@u.northwestern.edu")
      .map((user) => 
      <ListGroup.Item key={user.id}>
        <Row>
          <Col md={4} style={{ display: "flex"}}>
            <Container style={{ display: "flex", alignItems:"center" }}>
            {user.id} 
            </Container>
          </Col>
          <Col md={{ span: 2, offset: 6 }} style={{ display: "flex"}}>
          <Link to={{pathname:"/message", aboutProps: user.id}}>
            <Button variant="outline-dark">Message</Button>
          </Link>
          
          </Col>
        </Row>
      </ListGroup.Item>)
      )


      var messages = [];

      await getMessagesByUser("andrewsu2023@u.northwestern.edu")
          .then(data => {
            //setMessages(data);
            messages = data;
            console.log("inbox messages loaded in message ");
          }).catch(err => alert(err));
          
          
          console.log("how many messages? " +messages.length);

      setInbox(
        messages.map((message) =>
        <ListGroup.Item key={message.id}>
          <Row>
            <Col md={4} style={{ display: "flex"}}>
              <Container style={{ display: "flex", alignItems:"center" }}> {message.data().idFrom}</Container>
              {console.log("inbox message from: "+message.idFrom)}
            </Col>
            <Col md={6} style={{ display: "flex"}}>
              <Container style={{ display: "flex", alignItems:"center" }}>{message.data().content}</Container>
            </Col>
            <Col md={{ span: 2, offset: 12 }}>
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
    //const timestamp = moment()
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





  function renderMails(){
    return (
      <Container class="Mail">
        <div class="Inbox">
          <h5 class="inbox">Inbox </h5>
          <ListGroup>
           {inbox}
          </ListGroup>
        </div>

        

        <div class="Mail">
          <h4 class="list">Your Classmates </h4>
        </div>

        <ListGroup>
          {mails}
        </ListGroup>
      </Container>

    );
  }

  
  function renderForm(){
    return (
      <div class="User">
        <div class="user-info">
          <h5 class="course-title">Sender: {sender} </h5>
          <h5 class="course-title">Reciever: {sendTo} </h5>
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
          isLoading={isLoading}>
          Send
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