import React from "react";
import InfiniteScroll from 'react-infinite-scroller';
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
            searchTerm: '',
            videosLoading: false,
            videos: [],
            pageSize: 10,
            nextPageToken: '',
            selectedVideo: undefined,
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
            searchTerm: searchTerm,
            videosLoading: true
        });
        
        const result = await youtubeHttpClient.getVideos(searchTerm, this.state.pageSize);
        console.log(result);
        
        this.setState({
            ...this.state,
            selectedVideo: null,
            videosLoading: false,
            videos: result.data.items,
            nextPageToken: result.data.nextPageToken
        });
    };

    renderVideoSnippets = () => {
        if (this.state.videosLoading) {
            return <Loader/>;
        }
        
        return (
            <InfiniteScroll
                pageStart={0}
                loadMore={this.onLoadMoreVideos}
                hasMore={true}
                loader={<Loader/>}
                initialLoad={false}
            >
                <div className="ui relaxed divided list">
                    {this.renderVideoItems()}
                </div>
            </InfiniteScroll>
        // <div className="ui relaxed divided list">
        //     {this.renderVideoItems()}
        // </div>
        )
    }

    renderVideoItems = () => {
        if(this.state.videos.length === 0) {
            return null;
        }
        
        return this.state.videos.map(video => {
            return <VideoItem video={video} onClick={this.onVideoItemClick} key={video.id.videoId}/>
        });
    }

    onVideoItemClick = (video) => {
        this.setState({
            ...this.state,
            selectedVideo: video,
        });
        
        window.scrollTo(0, 0);
    }

    onLoadMoreVideos = async () => {
        console.log('onLoadMoreVideos');
        if(this.state.videosLoading) {
            return;
        }
        
        this.setState({
            ...this.state,
            videosLoading: true
        });
        
        const result = await youtubeHttpClient.getVideos(
            this.state.searchTerm,
            this.state.pageSize,
            this.state.nextPageToken);
        
        this.setState({
            ...this.state,
            videosLoading: false,
            videos: result.data.items,
            nextPageToken: result.data.nextPageToken    
        });
    }
}

export default App;
