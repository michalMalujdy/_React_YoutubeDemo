import React from "react";
import "./VideoItem.scss"

class VideoItem extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const video = this.props.video;
        return (
            <div className="video-item item" onClick={this.onClick}>
                <img className="ui image" src={video.snippet.thumbnails.medium.url} alt="video"/>
                <div className="content">
                    <div className="header">
                        {video.snippet.title}
                    </div>
                </div>
            </div>
        );
    }
    
    onClick = () => {
        this.props.onClick(this.props.video);
    }
}

export default VideoItem;