import React from "react";
import SearchBar from "./components/Search/SearchBar.jsx";
import Home from "./components/Home.jsx";
import Shows from "./components/Shows.jsx";
import Contact from "./components/Contact.jsx";
import About from "./components/Contact.jsx";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";


class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
      </div>
    )
  }
}
export default App


// export default function App() {
//   return (

//     <Router>

//       <div>
//         <ul>
//         <li>
//         <SearchBar/>
//         </li>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//           <li>
//             <Link to="/shows">Find Shows</Link>
//           </li>
//           <li>
//             <Link to="/contact">Contact Us</Link>
//           </li>
//         </ul>

//         <Switch>
//           <Route path='/about'>
//             <About />
//           </Route>
//           <Route path='/shows'>
//             <Shows />
//           </Route>
//           <Route path='/'>
//             <Home />
//           </Route>
//           <Route path='/contact'>
//             <Contact/>
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// function Home() {
//   return <h2>Home</h2>;
// }

// function About() {
//   return <h2>About</h2>;
// }

// function Shows() {
//   let match = useRouteMatch();

//   return (
//     <div>
//     <input />
//       <ul>
//         <li>
//           <Link to={`${match.url}/components`}>one</Link>
//         </li>
//         <li>
//           <Link to={`${match.url}/props-v-state`}>
//             two
//           </Link>
//         </li>
//       </ul>
//       <Switch>
//         <Route path={`${match.path}/:artist`}>
//           <Shows />
//         </Route>
//         <Route path={match.path}>
//           <h3>Select a show</h3>
//         </Route>
//       </Switch>
//     </div>
//   );
// }

// function Contact() {
//   let { topicId } = useParams();
//   return <h3>Requested topic ID: {topicId}</h3>;
// }
