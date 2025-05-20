import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/UserList';
import DiamondScreen from './screens/DiamondScreen';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
       <DiamondScreen />
       <ToastContainer />
    </div>
  );
}

export default App;
