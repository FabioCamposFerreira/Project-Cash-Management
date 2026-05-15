import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const Transactions = () => {
  return (
    <Container className="mt-4">
      <h2>Transactions</h2>
      <Button variant="primary" className="mb-3">Add Transaction</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2023-01-01</td>
            <td>Grocery</td>
            <td>$50</td>
            <td>Expense</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default Transactions;