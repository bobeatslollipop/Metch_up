import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "./Login.css";
import { Auth } from "../firebase";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Auth.currentUser) {
      alert("Already logged in!");
      props.history.replace("/");
    }
  }, [])

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    Auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("Logged in as " + email);
      props.history.replace('/');
    })
    .catch(err => alert(err));
    setIsLoading(false);
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <Form.Group controlId="email" bsSize="large">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" bsSize="large">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </Form.Group>
           <Button
             block
             type="submit"
             disabled={isLoading||!validateForm()}
            >
            Login
            </Button>
      </form>
    </div>
  );
}
