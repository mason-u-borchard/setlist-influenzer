import React from 'react';
import styled from 'styled-components';
import SearchAndSubmit from './SearchAndSubmit.jsx';

  // id: 3,
  // artist: "Volbeat",
  // date: "April 13, 2021",
  // venue: "The Fillmore",
  // location: "New Orleans, LA, USA",
  // picture: "https://tourdates-info.s3-us-west-1.amazonaws.com/volbeat-2016.jpg"


const SearchResult = (props) => {

    return(
      <div>
			<div className="results-row">
				<div className="col-12 results-header">
        <h2>{this.props.date}</h2>
					<h1 id="search-header">{this.props.artist} at {this.props.venue}</h1>
          <h1>{this.props.location} @18:00</h1>
					<a href="https://www.songkick.com/" target="_blank">
						<img className="songkick_logo"src={this.props.picture}alt="songkick logo" />
					</a>
				</div>
			</div>
		</div>
    )

}

export default SearchResult;