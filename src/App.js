import NewHabit from './pages/NewHabit';
import Habits from './pages/Habits';
import HomePage from './pages/HomePage';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path='/habits' element={<Habits/>}/>
        <Route path="/NewHabit" element={<NewHabit/>} />

      </Routes>
    </div>
  );
}

export default App;
