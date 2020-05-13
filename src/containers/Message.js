import React, {useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { db } from "../firebase";
import "./Message.css";

export default function Message(props) {
//props:   sender,reciever 

  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const user = props.name;
  const sendTo = props.location.aboutProps;
  if (sendTo){
    console.log(sendTo);
  } else {
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
        idFrom: user,
        idTo: 'andrewsu2023@u.northwestern.edu', 
        time:  ''//timestamp

    }).then(() => {
        console.log("User '" +user + "' sent '" + user +"'message"+content);
        props.history.push("/");
    })
    .catch(e => {
        console.error("Error storing data; " + e);
        alert(e);
        setIsLoading(false);
    });


  }
  function renderUserInfo() {

    return (
        <div class="User">
          <div class="user-info">
            <h5 class="course-title">Reciever: {user} </h5>
           {// Display reciever's name, other info, and classes 
           }
          </div>
        </div>
    );
  }
  function renderForm(){
    return (
        <div className="NewNote">
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
              {/*bsSize和bsStyle好像没用，能用的参数可以参照bootstrap教程*/}
              Send
            </Button>
          </form>
        </div>
      );
  }

  return (
    <Container className="Message">
      {renderUserInfo()}
      {renderForm()}
    </Container>
  );
}