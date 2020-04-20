import React from 'react';
import SearchBar from './SearchBar.jsx';
import axios from 'axios';

class Form extends React.Component {
  constructor(props){
    super(props);
    console.log(props, 'props')
    this.state = {
      setlistSubmitted: false,
      topSetlists: [],
      songs:[]
    }

  }

  getTopSetlists(){
    axios.get('/top-setlists')
      .then((data) => this.setState({topSetlists: data.data}))
      .then(() => {console.log('this.state.topSetlists: ', this.state.topSetlists)})
      .catch((err) => {
        console.log(err);
        })
  }

  handleEntry(entry) {
    for (var i = 1; i < 7; i++){
      var song = document.getElementById(`song-input${i}`).value;
      this.state.songs.push(song);
    }
    var setlistObj = {
      artist: "Volbeat",
      user: "mctallica",
      songs: this.state.songs,
      upvotes: 0
    }
    axios.post('/setlist', setlistObj)
      .then((res) => {
        console.log('res.data: ', res.data);
      })
      .catch((err) => {
        console.log('error submitting setlist entry: ', err);
      });

  }


  // createTable() {
  //   let table = []

  //   // Outer loop to create parent
  //   for (let i = 0; i < 3; i++) {
  //     let table = []
  //     //Create the parent and add the children
  //     table.push(<tr id={`song${i}`}><input className="form-input" type="text" placeholder="enter a song"  /></tr>)
  //   }
  //   return table;
  // }

  render() {
    return(
      <div>
      <form onSubmit={(e) => this.handleEntry(e)}>
      <h1>Create your ideal setlist</h1>
             <p> <input className="form-input" id="song-input1" type="text" placeholder="enter a song" /> </p>
             <p> <input className="form-input" id="song-input2" type="text" placeholder="enter a song"  /> </p>
             <p> <input className="form-input" id="song-input3" type="text" placeholder="enter a song"  /> </p>
             <p> <input className="form-input" id="song-input4" type="text" placeholder="enter a song"  /> </p>
             <p> <input className="form-input" id="song-input5" type="text" placeholder="enter a song"  /> </p>
             <p> <input className="form-input" id="song-input6" type="text" placeholder="enter a song"  /> </p>
             <input type="button" className="mcButton" value="Submit Setlist" onClick={(e) => this.handleEntry(e)}/>

              </form>
              </div>
    )
  }
}
export default Form;


// render() {
//   return(
//     <div>
//     <form onSubmit={(e) => this.handleEntry(e)}>
//     <div className="form-container">
//     <h1>Create your ideal setlist</h1>
//            <p> <input className="form-input" type="text" placeholder="enter a song"  /> </p>
//            <p> <input className="form-input" type="text" placeholder="enter a song"  /> </p>
//            <p> <input className="form-input" type="text" placeholder="enter a song"  /> </p>
//            <p> <input className="form-input" type="text" placeholder="enter a song"  /> </p>
//            <p> <input className="form-input" type="text" placeholder="enter a song"  /> </p>
//            <p> <input className="form-input" type="text" placeholder="enter a song"  /> </p>
//            <input type="button" className="mcButton" value="Submit Setlist" onClick={(e) => this.handleEntry(e)}/>
//             </div>
//             </form>
//             </div>
//   )
// }