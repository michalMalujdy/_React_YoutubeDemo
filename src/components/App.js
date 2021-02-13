import React from "react";
import youtubeHttpClient from "../httpClients/youtubeHttpClient";
import SearchBar from "./SearchBar/SearchBar";
import VideoItem from "./VideoItem/VideoItem";
import VideoDetails from "./VideoDetails/VideoDetails";
import Loader from "./Loader/Loader";
import "./App.scss"
import "./Global.scss"

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            videos: undefined,
            videosLoading: false,
            selectedVideo: undefined
        }
    }
    
    render() {        
        return (
            <div className="app">
                <SearchBar onSubmit={this.onSearchSubmit}/>
                <VideoDetails video={this.state.selectedVideo}/>              
                {this.renderVideoSnippets()}
            </div>
        )
    }
    
    onSearchSubmit = async (searchTerm) => {
        this.setState({
            ...this.state,
            videosLoading: true
        });
        
        const results = await youtubeHttpClient.getVideos(searchTerm);
        
        this.setState({
            ...this.state,
            videos: results.data.items,
            selectedVideo: null,
            videosLoading: false
        });
    };

    renderVideoSnippets = () => {
        if (this.state.videosLoading) {
            return <Loader/>;
        }
        
        return (
            <div className="ui relaxed divided list">
                {
                    this.state.videos &&
                    this.state.videos.map(video => {
                        return <VideoItem video={video} onClick={this.onVideoItemClick} key={video.id.videoId}/>
                    })
                }
            </div>
        )
    }
    
    onVideoItemClick = (video) => {
        this.setState({
            ...this.state,
            selectedVideo: video
        });
        
        window.scrollTo(0, 0);
    }
}

export default App;
