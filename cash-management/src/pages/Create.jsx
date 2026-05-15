import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Create = () => {
  return (
    <Container className="mt-4">
      <h2>Create Transaction</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Enter description" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control type="number" placeholder="Enter amount" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Select>
            <option>Income</option>
            <option>Expense</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default Create;