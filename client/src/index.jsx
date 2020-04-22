import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import Shows from './components/Shows.jsx';
import Contact from './components/Contact.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import SearchAndSubmit from "./components/SearchAndSubmit.jsx";

const routing = (
  <Router>
    <div>
      <ul id="menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contests">Contests</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
      <Route exact path="/" component={App} />
      <Route exact path="/shows" component={Shows} />
      <Route exact path="/contact" component={Contact} />

        <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
    </div>
  </Router>
)

ReactDOM.render(
    routing,
  document.getElementById('root')
);
