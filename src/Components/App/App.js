
import React from 'react';
import './App.css';
import  SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResult';
import PlayList from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks:[]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  addTrack(track) {
    let tracks = this.state.playlistTracks
  if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
  return;
} 
  tracks.push(track);
  this.setState({
    playlistTracks : tracks
  });
}

removeTrack(track) {
  let tracks = this.state.playlistTracks
  tracks.filter(currentTrack => currentTrack.id !== track.id);
  this.setState({
    playlistTracks: tracks
  })
}
updatePlaylistName(name){
  this.setState({
    playlistName: name
  })
}

savePlaylist() {
  let trackURIs = [];
  this.state.playlistTracks.forEach(playlistTrack => {
    trackURIs.push(playlistTrack.uri);
  });
  Spotify.savePlayList(this.state.playlistName, trackURIs);
  this.setState({playlistTracks:[], playlistName: 'New Playlist', searchResults:[]});
}

search(term) {
Spotify.search(term).then(searchResults => {
  this.setState({
    searchResults:searchResults
  })
})
}
  render(){
  return (
    <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
        <PlayList onSave={this.savePlaylist} onNameChange= {this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
      </div>
      </div>
    </div>
  )
  }
}


export default App;
