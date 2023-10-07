import './App.css';
import { ThemeProvider } from './controllers/ThemeContext';
import Navbar from './components/Navbar'
import { PersonaProvider } from './controllers/PersonaContext';

function App() {
  return (
    <ThemeProvider>
      <PersonaProvider>
        <div className="App">
            <Navbar></Navbar>
        </div>
      </PersonaProvider>
    </ThemeProvider>
  );
}

export default App;
