import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/esm/Button';
import { useTheme } from '../controllers/ThemeContext';
import { BsFillSunFill, BsFillMoonStarsFill } from 'react-icons/bs'

function NavBar() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown title="Persona" id="basic-nav-dropdown">
              <NavDropdown.Item>Lisa</NavDropdown.Item>
              <NavDropdown.Item>Alan</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Button onClick={toggleTheme} variant='link' size='lg'>
          {darkMode ? <BsFillSunFill /> : <BsFillMoonStarsFill/>}
        </Button>
      </Container>
    </Navbar>
  );
}

export default NavBar;