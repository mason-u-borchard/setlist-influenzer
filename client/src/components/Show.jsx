import React from 'react';
import SearchBar from './SearchBar.jsx';

class Form extends React.Component {
  constructor(props){
    super(props);
    console.log(props, 'props')
    this.state = {
      setlistSubmitted: false
    }

  }
  render() {
    return(
      <div className="form-container">
      <h1>Create your ideal setlist</h1>
             <p> <input className="song-input" type="text" placeholder="enter a song"  /> </p>
             <p> <input className="song-input" type="text" placeholder="enter a song"  /> </p>
             <p> <input className="song-input" type="text" placeholder="enter a song"  /> </p>
             <p> <input className="song-input" type="text" placeholder="enter a song"  /> </p>
             <p> <input className="song-input" type="text" placeholder="enter a song"  /> </p>
             <p> <input className="song-input" type="text" placeholder="enter a song"  /> </p>
              </div>
    )
  }
}
export default Form;