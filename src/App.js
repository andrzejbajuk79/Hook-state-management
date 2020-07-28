import React from 'react';
import './App.css';
import Calc from './components/Calc';

function App () {
  return (
    <div className="App">
      <Calc max={15} step={3} />
    </div>
  );
}

export default App;
