import React from 'react';
import { Container, Row, Col, Card, Button, Navbar, Nav } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <div>
      {/* Sidebar */}
      <div className="bg-dark text-white vh-100 position-fixed" style={{ width: '250px' }}>
        <div className="p-3">
          <h4>Cash Management</h4>
        </div>
        <Nav className="flex-column">
          <Nav.Link href="/dashboard" className="text-white">Dashboard</Nav.Link>
          <Nav.Link href="/transactions" className="text-white">Transactions</Nav.Link>
          <Nav.Link href="/types" className="text-white">Types</Nav.Link>
          <Nav.Link href="/create" className="text-white">Create</Nav.Link>
        </Nav>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '250px' }}>
        <Navbar bg="light" expand="lg" className="px-3">
          <Navbar.Brand>Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Container fluid className="p-4">
          <Row>
            <Col md={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Total Balance</Card.Title>
                  <h2>$10,000</h2>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Income</Card.Title>
                  <h2>$5,000</h2>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Expenses</Card.Title>
                  <h2>$3,000</h2>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;