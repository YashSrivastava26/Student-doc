import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

function BasicExample() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/sign-in')
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">StudentDoc</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Notes</Nav.Link>
            {/* <Nav.Link as={Link} to="/docs">Docs</Nav.Link> */}
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            {!localStorage.getItem('token') ? <>
            <Button className='mx-2' as={Link} to="/sign-up"> Sign Up</Button> 
            <Button as={Link} to="/sign-in"> Sign In</Button> </> : 
            <Button onClick={handleLogOut}> Log Out</Button>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;