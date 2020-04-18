import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx';
import Shows from './components/Shows.jsx';
import Contact from './components/Contact.jsx';

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
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <Route exact path="/" component={App} />
      <Route path="/shows" component={Shows} />
      <Route path="/contact" component={Contact} />
    </div>
  </Router>
)

ReactDOM.render(
    routing,
  document.getElementById('root')
);
