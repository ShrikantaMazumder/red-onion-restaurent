import React from 'react';
import logo from './logo.svg';
import './App.css';
import fakeData from './fakeData'

function App() {
  const breakfast = fakeData.filter(breakfast => breakfast.category === 'dinner');
  console.log(breakfast);
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
