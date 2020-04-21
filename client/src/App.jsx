import React from "react";
import axios from "axios";
import SearchAndSubmit from "./components/SearchAndSubmit.jsx";
import Carousel from "./components/Carousel.jsx";
import Shows from "./components/Shows.jsx";
import Contact from "./components/Contact.jsx";
import About from "./components/About.jsx";
import Login from './components/Login.jsx';
import Register from './components/Login.jsx';
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

const Wrapper = styled.section`
padding: 4em;
`;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showData: []
    }

  }

  componentDidMount(){
    this.getShowData();
  }

  getShowData(){
    axios.get('/tourdates')
    .then(({data}
      ) => {
      this.setState({
        showData: data
      })
    })
    .catch((res, err) => {
      console.log(`Could not get show data from dB: ${err}`);
    });
  }



  render() {
    return (
      <div>
      <Wrapper>
      <div>
        <SearchAndSubmit/>

      </div>
      <Carousel/>
      </Wrapper>
      </div>
    )
  }
}
export default App

