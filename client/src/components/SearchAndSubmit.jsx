import React from 'react';
import axios from 'axios';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';


class SearchAndSubmit extends React.Component {
  constructor(props){
    super(props);
    console.log('props', props)
    this.state = {
      userSearch: '',
      searchResults: [],
      view: 'main',
      showSelected: false,
      currentSelection: null,
      currentUser: 'mctallica',
      setlistSubmitted: false,
      topSetlists: [],
      songs:[]
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleEntry = this.handleEntry.bind(this);

    this.handleRedirect = this.handleRedirect.bind(this)

  }


  getTopSetlists(){
    axios.get('/top-setlists')
      .then((data) => this.setState({topSetlists: data.data}))
      .then(() => {console.log('this.state.topSetlists: ', this.state.topSetlists)})
      .catch((err) => {
        console.log(err);
        })
  }

  handleEntry(e) {
    e.preventDefault();
    for (var i = 1; i < 9; i++){
      var song = document.getElementById(`song-input${i}`).value;
      this.state.songs.push(song);
    }
    var setlistObj = {
      artist: this.state.currentSelection.artist,
      location: this.state.currentSelection.venue,
      venue: this.state.currentSelection.venue,
      user: this.state.currentUser,
      songs: this.state.songs,
      upvotes: 0
    }
    axios.post('/setlist', setlistObj)
      .then((res) => {
        console.log('res.data: ', res.data);
      })
      .then(() => {
        this.setState({
          view: 'submitted'
        })
      })
      .then(() => {
        var getArtist = {
          artist: this.state.currentSelection.artist
        }
        axios.get('/setlists-artist', getArtist)
      })
      .catch((err) => {
        console.log('error submitting setlist entry: ', err);
      });

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
        view: 'form',
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

    if (this.state.view === 'main'){
      return (
        <div className="box" >
        <h1 >Setlist Influenzers</h1>
        <div id="search" >
        <span>
        <input className="form-input" id="search-input" type="text" placeholder="Find an event" onChange={(e) => this.setState({userSearch: e.target.value})}/>
        <Router> <Link to="/search-events"> <input type="button" className="mcButton" value="Search" onClick={(e) => this.handleSearch(e)}/></Link></Router>
        <Route path="/search-events" component={SearchAndSubmit} />
        </span>
      </div>
      <ul className="show-list">
      { this.state.searchResults.map((item, i) => {
          // Notice the use of the bind() method. It makes the
          // ind available to the clicked function:
          return <li className="search-item" id={item.id} key={i}>
          <div className="results-row">
          <div className="col-12-results-header">
          <span className="search-item-info">
            <h2 className="search-header" onClick={(e) => this.handleRedirect(item)}>{item.artist}</h2>
            <h1><strong>{item.venue}</strong>   |   <strong>{item.location}</strong> </h1>
            <h2>{item.date}</h2>
            </span>
              <img className="artist_pic" src={item.picture} />
          </div>
        </div>
          </li>
        })
      }
    </ul>
      </div>

       )

    } else if (this.state.view === 'form'){
      return (
        <div className="box">
     <h1>Setlist Influenzers</h1>
        <div id="search">
        <p>
        <input className="form-input" id="search-input" type="text" placeholder="Find an event" onChange={(e) => this.setState({userSearch: e.target.value})} />
        <Router> <Link to="/search-events"> <input type="button" className="mcButton" value="Search" onClick={(e) => this.handleSearch(e)}/></Link></Router>
        <Route path="/search-events" component={SearchAndSubmit} />
        </p>

      </div>


          <div>
      <form onSubmit={(e) => this.handleEntry()}>
      <div className="setlist-prompt"><h3>What setlist would you like to see {this.state.currentSelection.artist} perform at {this.state.currentSelection.venue}?</h3></div>
             <p> <input className="form-input" id="song-input1" type="text" placeholder="enter a song" /> </p>
             <p> <input className="form-input" id="song-input2" type="text" placeholder="enter a song"  /> </p>
             <p> <input className="form-input" id="song-input3" type="text" placeholder="enter a song"  /> </p>
             <p> <input className="form-input" id="song-input4" type="text" placeholder="enter a song"  /> </p>
             <p> <input className="form-input" id="song-input5" type="text" placeholder="enter a song"  /> </p>
             <p> <input className="form-input" id="song-input6" type="text" placeholder="enter a song"  /> </p>
             <p> <input className="form-input" id="song-input7" type="text" placeholder="enter a song"  /> </p>
             <p> <input className="form-input" id="song-input8" type="text" placeholder="enter a song"  /> </p>

             <input type="button" id="myButton" value="Submit Setlist" onClick={(e) => this.handleEntry(e)}/>



              </form>
              </div>
        </div>
      )
    } else if (this.state.view === 'submitted'){
      return (
<div>
<h1>Setlist Influenzers</h1>
<div id="search" >
      <span>
      <input className="form-input" id="search-input" type="text" placeholder="Find an event" onChange={(e) => this.setState({userSearch: e.target.value})}/>
      <Router> <Link to="/search-events"> <input type="button" className="mcButton" value="Search" onClick={(e) => this.handleSearch(e)}/></Link></Router>
      <Route path="/search-events" component={SearchAndSubmit} />
      </span>
    </div>



    <div class="grid">
  <div class="one">
  <h5>Your {this.state.currentSelection.artist} setlist</h5>
    <ul>
      <li>All In</li>
      <li>IOU</li>
      <li>Moonlight</li>
      <li>Into the Sun</li>
      <li>Young London</li>
      <li>Curiousity</li>
      <li>Into the Sun</li>
      <li>No One</li>

    </ul>
  </div>

  <div class="three">
  <h5>Average set for {this.state.currentSelection.artist}</h5>
  <ul>
      <li>Death Valley</li>
      <li>IOU</li>
      <li>All In</li>
      <li>Curiousity</li>
      <li>Eight to 16</li>
      <li>Into the Sun</li>
      <li>No One</li>
      <li>The Flight of the Apollo</li>
    </ul>
  </div>

</div>

{/* <div class="grid rtl">
  <div class="one">1</div>

  <div class="three">3</div>
  <div class="four">4</div>
</div> */}

</div>


      )
    }

  }
 }

 export default SearchAndSubmit

/// timeline intro

{/* <section className="intro">
  <div className="container">
   <span> <h1>Your setlist &darr;</h1> </span><span></span><span><h1>Average user-picked setlist for {this.state.artist} &darr;</h1></span>
  </div>
</section> */}



//  <p> <input className="form-input" id="song-input9" type="text" placeholder="enter a song"  /> </p>
//  <p> <input className="form-input" id="song-input10" type="text" placeholder="enter a song"  /> </p>
//  <p> <input className="form-input" id="song-input11" type="text" placeholder="enter a song"  /> </p>
//  <p> <input className="form-input" id="song-input12" type="text" placeholder="enter a song"  /> </p>
//  <p> <input className="form-input" id="song-input13" type="text" placeholder="enter a song"  /> </p>
//  <p> <input className="form-input" id="song-input14" type="text" placeholder="enter a song"  /> </p>
//  <p> <input className="form-input" id="song-input15" type="text" placeholder="enter a song"  /> </p>


/// single item (old)
{/* <li className="search-item" id={this.state.currentSelection.id}>
<div className="results-row">
<div className="col-12 results-header">
<span className="search-item-info">
<h1 className="search-header">{this.state.currentSelection.artist}</h1>
  <h1>{this.state.currentSelection.venue} {this.state.currentSelection.location} </h1>
  <h2>{this.state.currentSelection.date} @{this.state.currentSelection.time}</h2>
  </span>
    <img className="artist_pic" src={this.state.currentSelection.picture} />
</div>
</div>
</li> */}