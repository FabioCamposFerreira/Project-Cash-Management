import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Button from "../components/Button/Button.tsx";
import InputText from "../components/Input/InputText.tsx";
import Card from "../components/Card/Card.tsx";

const Login = () => {
  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center bg-light"
    >
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <Card>
            <h2 className="text-center mb-4">Cash Management</h2>
            <h3 className="text-center mb-4">Log In</h3>
            <Form>
              <InputText
                id="email"
                label="EMAIL"
                name="email"
                type="email"
                placeholder="your.email@email.com"
              />
              <InputText
                id="password"
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
              />
              <Button text="Log In" type="submit" />
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
