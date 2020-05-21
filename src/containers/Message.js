import React, {useState,useEffect } from "react";
import { Form, Button, Container, ListGroup, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { db,getUserByClass,getUserById } from "../firebase";
import "./Message.css";

export default function Message(props) {
//props:   sender,reciever 

  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //from app.js, show mail list.
  //from Modal.js, show message form.
  const [showMail, setShow] = useState(false);
  var showlist = false;
  const [mails, setMails] = useState(null);
  // only for the reciever selected from the mail list.
  const [inbox, setInbox] = useState([]);
  const [classes, setClasses] = useState([]);
  const [users,setUsers] = useState([]);



  //sender passed by App.js
  //sendTo passed by Modal.js
  const sender = props.userName;
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
  
    await getUserById("tonyluo2023@u.northwestern.edu")
    .then(data => {
      setClasses(data.classes);
      console.log("classes loaded in message with "+data.classes);
      addUsers(classes);  //data.classes or classes? 
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
    async function addUsers(classList){
      for(let i =0;i<classList.length;i++){
        console.log("add class id "+classList[i]+"to the list.");
        await getUserByClass(classList[i])
        .then(data => {
          setUsers(data);
        }).catch(err => alert(err));
        a = a.concat(users);  
      }
    }

    setMails(
      ["tonyluo2023@u.northwestern.edu","tonyluo2023@u.northwestern.edu"] // temporary  example!!!!  replace with 'a', replace {user.id} below
      .filter(user => user.id !== "tonyluo2023@u.northwestern.edu")
      .map((user) => 
      <ListGroup.Item key={user.id}>
        <Row>
          <Col md={4}>
            {"tonyluo2023@u.northwestern.edu"} 
          </Col>
          <Col md={{ span: 2, offset: 6 }}>
          <LinkContainer to={{pathname:"/message", aboutProps: user.id}}>
            <Button variant="outline-light">Message</Button>
          </LinkContainer>
          
          </Col>
        </Row>
      </ListGroup.Item>)
      )

      var messages = [1];
      //fix the link of the botton later 
      setInbox(
        messages.map((message) =>
        <ListGroup.Item key={message.id}>
        <Row>
          <Col md={4}>
            {"Andrew Su"} 
          </Col>
          <Col md={6}>
            {"Would you like to be my 212 partner?"} 
          </Col>
          <Col md={{ span: 2, offset: 12 }}>
          <LinkContainer to={{pathname:"/message", aboutProps: message.id}}>
            <Button variant="outline-light">Open</Button>
          </LinkContainer>
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
      <div class="Mail">
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
      </div>

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