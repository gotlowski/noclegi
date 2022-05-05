import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from '@testing-library/react';

let state = null;

function useState(defaultValue) {

  const setValue = defaultValue => {
    state[0] = defaultValue;
  }

  const currentState = [defaultValue, setValue];
  state = currentState;

  return currentState;
}

function TestHook() {
  const [value, setValue] = useState('start');

  return(
    <>
      <h1>Test hooka!</h1>
      <input type="text" 
        value={value} 
        onChange={e => setValue(e.target.value)}></input>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    {/* <TestHook /> */}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
