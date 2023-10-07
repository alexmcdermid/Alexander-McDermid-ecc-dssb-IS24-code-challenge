import './App.css';
import { ThemeProvider } from './controllers/ThemeContext';
import Navbar from './components/Navbar'

function App() {
  return (
    <ThemeProvider>
      <div className="App">
          <Navbar></Navbar>
      </div>
    </ThemeProvider>
  );
}

export default App;
