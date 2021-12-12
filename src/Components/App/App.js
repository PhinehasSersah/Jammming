
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
  
      if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
          return;
      } else {
        const currentList = this.state.playlistTracks
       currentList.push(track);

        this.setState({
       playlistTracks : currentList
       });
      }
    }

  removeTrack(track) {
    const newPlaylistTracks = this.state.playlistTracks.filter(currentTrack => currentTrack.id !== track.id);
          
    this.setState({
      playlistTracks: newPlaylistTracks
    })
  }

     updatePlaylistName(name){
        this.setState({
          playlistName: name
       })
    }

  savePlaylist() {
     const trackUris = this.state.playlistTracks.map(track => track.uri);

      Spotify.savePlayList(this.state.playlistName, trackUris).then(() => {
        this.setState({
          playlistName: 'My Playlist',
          playlistTracks: []
        })
      })
  }

  search(term) {
      Spotify.search(term).then(searchResults => 
      this.setState({ searchResults: searchResults})
    );
  }
  render(){
  return (
    <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
        <PlayList onSave={this.savePlaylist} 
        onNameChange= {this.updatePlaylistName} 
        onRemove={this.removeTrack}
         playlistName={this.state.playlistName}
          playlistTracks={this.state.playlistTracks}/>
      </div>
      </div>
    </div>
  )
  }
}


export default App;
