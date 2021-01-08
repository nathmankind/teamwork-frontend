import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";

const LoginForm = () => {
  const api_url = "http://localhost:8000/api/v1";
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    axios
      .post(`${api_url}/auth/login`, userData)
      .then((res) => {
        const data = res.data.data;

        sessionStorage.setItem("user_payload", JSON.stringify(data));
        if (data) {
          history.push("/feeds");
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="/logo.png" /> Log-in to your account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              value={email}
              onChange={(e) => {
                const { value } = e.target;
                setEmail(value);
              }}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => {
                const { value } = e.target;
                setPassword(value);
              }}
            />

            <Button color="teal" fluid size="large" onClick={handleSubmit}>
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;
