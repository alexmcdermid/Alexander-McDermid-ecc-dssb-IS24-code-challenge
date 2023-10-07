import './App.css';
import { ThemeProvider } from './controllers/ThemeContext';
import { PersonaProvider } from './controllers/PersonaContext';
import Navbar from './components/Navbar'
import ProductList from './components/ProductList';

function App() {
  return (
    <ThemeProvider>
      <PersonaProvider>
        <div className="App">
            <Navbar></Navbar>
            <ProductList />
        </div>
      </PersonaProvider>
    </ThemeProvider>
  );
}

export default App;
