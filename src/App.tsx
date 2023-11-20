import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import Retocolores from './Retocolores.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/" Component={Retocolores} />
      </Routes>
    </Router>
  );
}

export default App;