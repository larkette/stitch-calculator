import React from 'react';
// import ReactDOM from 'react-dom/client';
import Calculator from './calculator.js';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       
        <Calculator />
      </header>
    </div>
  );
}

export default App;
