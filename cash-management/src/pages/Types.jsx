import React from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';

const Types = () => {
  return (
    <Container className="mt-4">
      <h2>Transaction Types</h2>
      <Button variant="primary" className="mb-3">Add Type</Button>
      <ListGroup>
        <ListGroup.Item>Food</ListGroup.Item>
        <ListGroup.Item>Transport</ListGroup.Item>
        <ListGroup.Item>Entertainment</ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default Types;