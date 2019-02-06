import React from 'react';
import logo from './logo.svg';
import './App.css';
import Input from './Components/Input/Input';

/* eslint-disable */
class App extends React.PureComponent {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Input
            inputType="password"
            placeholderText="Password"
            inputCheckerType="password"
            inputClassName="Password-input Test-input-style"
            togglePasswordVisibility
            toggleButtonClassName="Password-toggle-button"
            toggleIconClassName="Password-toggle-icon"
          />
        </header>
      </div>
    );
  }
}

export default App;
