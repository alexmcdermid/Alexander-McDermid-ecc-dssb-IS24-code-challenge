import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/esm/Button';
import { useTheme } from '../controllers/ThemeContext';
import { BsFillSunFill, BsFillMoonStarsFill } from 'react-icons/bs'
import { usePersona } from '../controllers/PersonaContext';

function NavBar() {
  const { darkMode, toggleTheme } = useTheme();
  const { currentPersona, setPersona } = usePersona();

  const handlePersonaChange = (persona) => {
    setPersona(persona); 
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className='ms-3'>IS24</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown title={`Current Persona: ${currentPersona}`} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => handlePersonaChange('Lisa')}>Lisa</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handlePersonaChange('Alan')}>Alan</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Button onClick={toggleTheme} variant='link' size='lg'>
            {darkMode ? <BsFillSunFill /> : <BsFillMoonStarsFill/>}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;