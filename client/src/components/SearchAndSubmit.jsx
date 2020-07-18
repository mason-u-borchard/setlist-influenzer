import React from 'react';
import axios from 'axios';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import TM_API_KEY from '../../../bandInfo.js';

class SearchAndSubmit extends React.Component {
  constructor(props) {
    super(props);
    this.finalAverages = [];
    this.state = {
      userSearch: '',
      searchResults: [],
      view: 'main',
      showSelected: false,
      currentSelection: null,
      currentUser: 'mctallica',
      setlistSubmitted: false,
      topSetlist: this.finalAverages,
      songs: [],
      allSetlists: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleEntry = this.handleEntry.bind(this);

    this.handleRedirect = this.handleRedirect.bind(this);

    this.calculateTopSetlist = this.calculateTopSetlist.bind(this);
  }

  calculateTopSetlist() {
    const result = {};
    // iterate over array of objects
    for (let i = 0; i < this.state.allSetlists.length; i++) {
      result[i] = [];
      // iterate over the song key which contains array of songs for each obj
      for (let j = 0; j < 9; j++) {
        // push the songs into corresponding key in the result obj 0-7
        result[i].push(this.state.allSetlists[i].songs[j]);
        console.log('result', result);
      }
    }
    // iterate over keys 0-7 in result obj
    const setObjBySong = {
      0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [],
    };
    // var setObjBySong = {};
    for (var key in result) {
      console.log('result[key]', result[key]);
      // this creates one persons setlist
      const setArr = result[key].join(',').split(', ');
      // var setArr = result[key];
      console.log('setArr: should be one setlist', setArr);
      // iterate over that persons setlist
      const songAtNumArr = [];

      for (let k = 0; k < 8; k++) {
        // each key 1-8 will contain all songs by all fans at the position
        setObjBySong[k].push(setArr[k]);
        console.log('setObjBySong[k], should be an array with songs', setObjBySong[k]);
        console.log('setObjBySong', setObjBySong);
        // if (setArr[k] === '' || !setArr[k]){
        //   continue;
        // }
        // if the song is not already a key
        // if (setObjBySong[k] === undefined){
        //   // make a space for it and set to 1
        //   setObjBySong[k] = arrayAtNum;
        //   console.log('setObjBySong[k] should be a song', setObjBySong[k])
        // }
        // else add one to the song
        // setObjBySong[setArr[k]]++;
        // console.log('setObjBySong[setArr[k]] after adding ++', setObjBySong[setArr[k]])
      }
    }

    for (var key in setObjBySong) {
      const songsAtPosition = {};
      for (let x = 0; x < setObjBySong[key].length; x++) {
        const song = setObjBySong[key][x];
        if (song === '' || !song) {
          continue;
        }
        // if the song is not already a key
        if (songsAtPosition[song] === undefined) {
          // make a space for it and set to 1
          songsAtPosition[song] = 1;
          console.log('songsAtPosition[song] should be a num', songsAtPosition[song]);
          console.log('songsAtPosition obj', songsAtPosition);
        }
        // else add one to the song
        songsAtPosition[song]++;
        console.log('songsAtPosition after adding ++', songsAtPosition);
      }
      let max = Object.values(songsAtPosition)[0];
      console.log('Object.values(songsAtPosition)', Object.values(songsAtPosition));
      let topSong = Object.keys(songsAtPosition)[0];
      console.log('Object.keys(songsAtPosition)', Object.keys(songsAtPosition));
      // iterate over object values in objBySong which are numbers
      for (let m = 0; m < Object.values(songsAtPosition).length; m++) {
        // if song was chosen more than max
        if (Object.values(songsAtPosition)[m] > max) {
          // it is now the max
          max = Object.values(songsAtPosition)[m];
          topSong = Object.keys(songsAtPosition)[m];
        }
      }
      this.finalAverages.push(topSong);
      // this.setState({
      //   topSetlist: this.state.topSetlist.push(topSong)
      // })
    }
    this.setState({
      topSetlist: this.finalAverages,
      view: 'submitted',
    });
  }


  // getTopSetlists(){
  //   axios.get('/top-setlists')
  //     .then((data) => this.setState({topSetlists: data.data}))
  //     .then(() => {console.log('this.state.topSetlists: ', this.state.topSetlists)})
  //     .catch((err) => {
  //       console.log(err);
  //       })
  // }


  handleEntry(e) {
    e.preventDefault();
    for (let i = 1; i < 9; i++) {
      const song = document.getElementById(`song-input${i}`).value;
      this.state.songs.push(song);
    }
    const setlistObj = {
      artist: this.state.currentSelection.artist,
      location: this.state.currentSelection.venue,
      venue: this.state.currentSelection.venue,
      user: this.state.currentUser,
      songs: this.state.songs,
      upvotes: 0,
    };

    axios.post('/setlist', setlistObj)
      .then((res) => {
        const artistQuery = this.state.currentSelection.artist;

        console.log(this.state.currentSelection.artist);

        axios.get('/setlists-artist', { params: { artistQuery } }).then((data) => {
          console.log('data from getting all setlists', data.data);
          this.setState({
            allSetlists: data.data,
          });
        })
          .then(() => {
            this.calculateTopSetlist();
          });
      })
      .catch((err) => {
        console.log('error submitting setlist entry: ', err);
      });
  }

  handleSearch() {

    axios.post('/search', { params: { searchQuery } })
    // const searchQuery = this.state.userSearch;
    const searchQuery = 'Above and Beyond';
    console.log(searchQuery);
    axios.get('/search', { params: { searchQuery } })
      .then((data) => this.setState({ searchResults: data.data }))
      .then(() => { console.log('this.state.searchResults: ', this.state.searchResults); })
      .catch((err) => {
        console.log(err);
      });
  }

// ticket master event API no longer has events
// uncomment and use this handleSearch method when the events are back

  // handleSearch() {
  //   const searchQuery = this.state.userSearch;
  //   console.log(searchQuery);
  //   axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${searchQuery}&apikey=${TM_API_KEY}`)
  //     .then((res) =>
  //     console.log('get sum data', res.data)
  //     this.setState({ searchResults: res.data })
  //     )
  //     .then(() => { console.log('this.state.searchResults: ', this.state.searchResults); })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  handleRedirect(item) {
    console.log(item);
    this.setState({
      showSelected: true,
      view: 'form',
      currentSelection: item,
    });
  }


  render() {
    if (this.state.view === 'main') {
      return (
        <div className="box">
          <h1>Setlist Influenzers</h1>
          <div id="search">
            <span>
              <input className="form-input" id="search-input" type="text" placeholder="Find an event" onChange={(e) => this.setState({ userSearch: e.target.value })} />
              <Router>
                {' '}
                <Link to="/search-events">
                  {' '}
                  <input type="button" className="mcButton" value="Search" onClick={(e) => this.handleSearch(e)} />
                </Link>
              </Router>
              <Route path="/search-events" component={SearchAndSubmit} />
            </span>
          </div>
          <ul className="show-list">
            { this.state.searchResults.map((item, i) => (
              <li className="search-item" id={item.id} key={i}>
                <div className="results-row">
                  <div className="col-12-results-header">
                    <span className="search-item-info">
                      <h2 className="search-header" onClick={(e) => this.handleRedirect(item)}>{this.state.userSearch}</h2>
                      <h1>
                        <strong>{item.venue}</strong>
                        {' '}
                        |
                        {' '}
                        <strong>{item.location}</strong>
                        {' '}
                      </h1>
                      <h2>{item.date}</h2>
                    </span>
                    <img className="artist_pic" src={item.picture} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

      );
    } if (this.state.view === 'form') {
      return (
        <div className="box">
          <h1>Setlist Influenzers</h1>
          <div id="search">
            <p>
              <input className="form-input" id="search-input" type="text" placeholder="Find an event" onChange={(e) => this.setState({ userSearch: e.target.value })} />
              <Router>
                {' '}
                <Link to="/search-events">
                  {' '}
                  <input type="button" className="mcButton" value="Search" onClick={(e) => this.handleSearch(e)} />
                </Link>
              </Router>
              <Route path="/search-events" component={SearchAndSubmit} />
            </p>

          </div>


          <div>
            <form onSubmit={(e) => this.handleEntry(e)}>
              <div className="setlist-prompt">
                <h3>
                  What setlist would you like to see
                   {this.state.userSearch}
                  {' '}
                  perform at
                   {this.state.currentSelection.venue}
                  ?
                </h3>
              </div>
              <p>
                {' '}
                <input className="form-input" id="song-input1" type="text" placeholder="enter a song" />
                {' '}
              </p>
              <p>
                {' '}
                <input className="form-input" id="song-input2" type="text" placeholder="enter a song" />
                {' '}
              </p>
              <p>
                {' '}
                <input className="form-input" id="song-input3" type="text" placeholder="enter a song" />
                {' '}
              </p>
              <p>
                {' '}
                <input className="form-input" id="song-input4" type="text" placeholder="enter a song" />
                {' '}
              </p>
              <p>
                {' '}
                <input className="form-input" id="song-input5" type="text" placeholder="enter a song" />
                {' '}
              </p>
              <p>
                {' '}
                <input className="form-input" id="song-input6" type="text" placeholder="enter a song" />
                {' '}
              </p>
              <p>
                {' '}
                <input className="form-input" id="song-input7" type="text" placeholder="enter a song" />
                {' '}
              </p>
              <p>
                {' '}
                <input className="form-input" id="song-input8" type="text" placeholder="enter a song" />
                {' '}
              </p>

              <input type="button" id="myButton" value="Submit Setlist" onClick={(e) => this.handleEntry(e)} />


            </form>
          </div>
        </div>
      );
    } if (this.state.view === 'submitted') {
      return (
        <div>
          <h1>Setlist Influenzers</h1>
          <div id="search">
            <span>
              <input className="form-input" id="search-input" type="text" placeholder="Find an event" onChange={(e) => this.setState({ userSearch: e.target.value })} />
              <Router>
                {' '}
                <Link to="/search-events">
                  {' '}
                  <input type="button" className="mcButton" value="Search" onClick={(e) => this.handleSearch(e)} />
                </Link>
              </Router>
              <Route path="/search-events" component={SearchAndSubmit} />
            </span>
          </div>


          <div className="grid">
            <div className="one">
              <h5>
                Your
                {this.state.currentSelection.artist}
                {' '}
                setlist
              </h5>
              <ul>
                <li>{this.state.songs[0]}</li>
                <li>{this.state.songs[1]}</li>
                <li>{this.state.songs[2]}</li>
                <li>{this.state.songs[3]}</li>
                <li>{this.state.songs[4]}</li>
                <li>{this.state.songs[5]}</li>
                <li>{this.state.songs[6]}</li>
                <li>{this.state.songs[7]}</li>

              </ul>
            </div>

            <div className="three">
              <h5>
                Average set for
                {this.state.currentSelection.artist}
              </h5>
              <ul>
                <li>{this.state.topSetlist[0]}</li>
                <li>{this.state.topSetlist[1]}</li>
                <li>{this.state.topSetlist[2]}</li>
                <li>{this.state.topSetlist[3]}</li>
                <li>{this.state.topSetlist[4]}</li>
                <li>{this.state.topSetlist[5]}</li>
                <li>{this.state.topSetlist[6]}</li>
                <li>{this.state.topSetlist[7].split(',')[0]}</li>
              </ul>
            </div>

          </div>

          {/* <div className="grid rtl">
  <div className="one">1</div>

  <div className="three">3</div>
  <div className="four">4</div>
</div> */}

        </div>


      );
    }
  }
}

export default SearchAndSubmit;

// / timeline intro

{ /* <section className="intro">
  <div className="container">
   <span> <h1>Your setlist &darr;</h1> </span><span></span><span><h1>Average user-picked setlist for {this.state.artist} &darr;</h1></span>
  </div>
</section> */ }


//  <p> <input className="form-input" id="song-input9" type="text" placeholder="enter a song"  /> </p>
//  <p> <input className="form-input" id="song-input10" type="text" placeholder="enter a song"  /> </p>
//  <p> <input className="form-input" id="song-input11" type="text" placeholder="enter a song"  /> </p>
//  <p> <input className="form-input" id="song-input12" type="text" placeholder="enter a song"  /> </p>
//  <p> <input className="form-input" id="song-input13" type="text" placeholder="enter a song"  /> </p>
//  <p> <input className="form-input" id="song-input14" type="text" placeholder="enter a song"  /> </p>
//  <p> <input className="form-input" id="song-input15" type="text" placeholder="enter a song"  /> </p>


// / single item (old)
{ /* <li className="search-item" id={this.state.currentSelection.id}>
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
</li> */ }
