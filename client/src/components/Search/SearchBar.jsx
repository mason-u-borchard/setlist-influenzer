import React from "react";
import axios from "axios";

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userSearch: '',
      searchResults: []
      // should make a get req to get items
      // callback:  function(data) {
      //   console.log('check me out', data.items);
      //   exampleVideoData = data.items;
      // }
    }

  }


  handleSubmit(e){
    e.preventDefault();
    axios.get("/search/shows", e.target.value)
    .then((data) => {
      this.setState({
        searchResults: data
      })
    })
    this.setState({ userSearch: e.target.value });

  }


   // code to make something happen after selecting an option

  render(){
    return (
      <div className="search" onSubmit={this.handleSubmit.bind(this)}>
      <input className="search-input" type="text" onChange={(e) => this.setState({userSearch: e.target.value})} />
      <button className="search-btn" type='submit' />


    </div>
     )
  }
 }

 export default SearchBar

//  <span className="glyphicon glyphicon-search"></span>