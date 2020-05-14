import React, {useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { db } from "../firebase";
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
  const [reciever,setReciever] = useState(null);



  //sender passed by App.js
  //sendTo passed by Modal.js
  const sender = props.userName;
  const sendTo = props.location.aboutProps;
  if (sendTo){
    console.log("from class modal, the reciever is: "+sendTo);
  } else {
    showlist = true;
    console.log("Not from the class modal.");
  }

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
      <div class="Mail list">
        <div class="Mail">
          <h5 class="course-title">Find your classmates below! </h5>
        </div>

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