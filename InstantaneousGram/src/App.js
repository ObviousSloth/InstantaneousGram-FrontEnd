import logo from './logo.svg';
import './App.css';

function App() {
  return (
  <Router>
    <Routes>
        <Route path="/" element={<HomePage/>} />
        {/* Add more routes for other components/pages here */}
    </Routes>
</Router>
  );
}

export default App;
