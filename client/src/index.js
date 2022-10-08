import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import Customers from './Components/Customers';

const StartApp = () => {
  let routes = useRoutes([
    { path: "/", element: <App /> },
    { path: "customer", element: <Customers /> },
  ]);
  return routes;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <StartApp />
</Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
