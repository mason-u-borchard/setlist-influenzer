import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import Shows from './components/Shows.jsx';
import Contact from './components/Contact.jsx';
import Login from './components/Login.jsx';

const routing = (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shows">Shows</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
        <li>
          <Link to="/login">Sign-up/Login</Link>
        </li>
      </ul>
      <Route exact path="/" component={App} />
      <Route path="/shows" component={Shows} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
    </div>
  </Router>
)

ReactDOM.render(
    routing,
  document.getElementById('root')
);
