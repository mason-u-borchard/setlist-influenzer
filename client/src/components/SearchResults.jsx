// import React from 'react';
// import SearchResult from './SearchResult.jsx';
// import SearchAndSubmit from './SearchAndSubmit.jsx';

const SearchResults = (props) => {
  return(
    <ul>
    { this.props.searchResults.map((item, i) => {
        // Notice the use of the bind() method. It makes the
        // ind available to the clicked function:
        return <li className="search-item" id={item.id} key={i}>
        <SearchResult/>
        </li>;
      })
    }
  </ul>
  )

}

export default SearchResults;