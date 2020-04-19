import React from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar.jsx";
import Home from "./components/Home.jsx";
import Shows from "./components/Shows.jsx";
import Contact from "./components/Contact.jsx";
import About from "./components/Contact.jsx";
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
background: papayawhip;
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
      <Wrapper>
      <div>
        <SearchBar/>
      </div>
      </Wrapper>
    )
  }
}
export default App

