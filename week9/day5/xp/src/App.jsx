import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import MainContainer from './components/MainContainer';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <h1>✓ Productivity Tracker</h1>
        <p>Redux Performance Optimizations - Task & Category Management</p>
        <MainContainer />
      </div>
    </Provider>
  );
}

export default App;
