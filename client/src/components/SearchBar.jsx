import React from 'react';
import axios from 'axios';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    console.log(props, 'props')
    this.state = {
      userSearch: '',
      searchResults: []
    }
    this.handleSearch = this.handleSearch.bind(this);

    this.handleRedirect = this.handleRedirect.bind(this)

  }

  handleSearch() {
    const search_query = this.state.userSearch;
    console.log(search_query);
    axios.get('/search', {params: {search_query: search_query} })
      .then((data) => this.setState({searchResults: data.data}))
      .then(() => {console.log('this.state.searchResults: ', this.state.searchResults)})
      .catch((err) => {
        console.log(err);
        })
    }

    handleRedirect(){

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
    return (

      <div className="search-and-results" >
      <div className="search" >
      <input className="search-input" type="text" placeholder="find events by artist" onChange={(e) => this.setState({userSearch: e.target.value})} />
      <input type="button" className="mcButton" value="Search" onClick={this.handleSearch}/>

    </div>
    <ul className="show-list">
    { this.state.searchResults.map((item, i) => {
        // Notice the use of the bind() method. It makes the
        // ind available to the clicked function:
        return <li className="search-item" id={item.id} key={i}>
        <div className="results-row">
				<div className="col-12 results-header">
        <span className="search-item-info">
					<h1 className="search-header" onClick={this.handleRedirect}>{item.artist}</h1>
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
  }
 }

 export default SearchBar

//  <span className="glyphicon glyphicon-search"></span>