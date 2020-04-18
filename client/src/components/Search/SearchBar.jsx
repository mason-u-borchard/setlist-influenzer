import React from "react";
import axios from "axios";

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userSearch: '',
      searchResults: []
    }

  }


  handleSubmit(e){
    e.preventDefault();
    axios.get('/search/shows', e.target.value)
    .then((data) => {
      this.setState({
        searchResults: data
      })
    })
  }


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