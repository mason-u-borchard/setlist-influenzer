import React from 'react';
import axios from 'axios';
import Form from './Show.jsx';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    console.log(props, 'props')
    this.state = {
      userSearch: '',
      searchResults: [],
      showSelected: false,
      currentSelection: null
    }
    this.handleSearch = this.handleSearch.bind(this);

    this.handleRedirect = this.handleRedirect.bind(this)

  }

  handleSearch() {
    var searchQuery = this.state.userSearch;
    console.log(searchQuery);
    axios.get('/search', {params: {searchQuery: searchQuery} })
      .then((data) => this.setState({searchResults: data.data}))
      .then(() => {console.log('this.state.searchResults: ', this.state.searchResults)})
      .catch((err) => {
        console.log(err);
        })
    }

    handleRedirect(item){
      console.log(item)
      this.setState({
        showSelected: true,
        currentSelection: item
      })
    }

  // handleSubmit(){
  //   // e.preventDefault();
  //   // console.log('e.target', e.target);

  //     // filter search results so that anything with the index of the query (to lower case) is returned
  //     var results = this.props.showData.filter((item) =>
  //       item.artist.toLowerCase().indexOf(this.state.userSearch) > -1
  //     );
  //     // set state to filtered results
  //     this.setState({searchResults: results});
  //     console.log('this.state.searchResults: ', this.state.searchResults);

  // }


  render(){
    if (this.state.showSelected === false){
      return (
        <div className="search-and-results" >
        <div className="search" >
        <input className="search-input" type="text" placeholder="find events by artist" onChange={(e) => this.setState({userSearch: e.target.value})} />
        <input type="button" className="mcButton" value="Search" onClick={(e) => this.handleSearch(e)}/>

      </div>
      <ul className="show-list">
      { this.state.searchResults.map((item, i) => {
          // Notice the use of the bind() method. It makes the
          // ind available to the clicked function:
          return <li className="search-item" id={item.id} key={i}>
          <div className="results-row">
          <div className="col-12 results-header">
          <span className="search-item-info">
            <h1 className="search-header" onClick={(e) => this.handleRedirect(item)}>{item.artist}</h1>
            <h1>{item.venue} {item.location} </h1>
            <h2>{item.date} @18:00</h2>
            </span>
              <img className="artist_pic" src={item.picture} />
          </div>
        </div>
          </li>;
        })
      }
    </ul>
      </div>

       )

    } else {
      return (
        <div className="show-container">
        <div className="search" >
        <input className="search-input" type="text" placeholder="find events by artist" onChange={(e) => this.setState({userSearch: e.target.value})} />
        <input type="button" className="mcButton" value="Search" onClick={(e) => this.handleSearch(e)}/>

      </div>
      <li className="search-item" id={this.state.currentSelection.id}>
          <div className="results-row">
          <div className="col-12 results-header">
          <span className="search-item-info">
          <h1 className="search-header">{this.state.currentSelection.artist}</h1>
            <h1>{this.state.currentSelection.venue} {this.state.currentSelection.location} </h1>
            <h2>{this.state.currentSelection.date} @18:00</h2>
            </span>
              <img className="artist_pic" src={this.state.currentSelection.picture} />
          </div>
        </div>
          </li>;

        <Form />
        </div>
      )
    }

  }
 }

 export default SearchBar

