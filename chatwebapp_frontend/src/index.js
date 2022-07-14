import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {LoginRegisterHub} from './componenets/login/LoginRegisterHub'
import {Hub} from './componenets/main/Hub'
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginRegisterHub/>}/>
      <Route path="chat" element={<Hub />} />
    </Routes>

  </BrowserRouter>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
