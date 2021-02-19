import React from "react";
import youtubeHttpClient from "../../httpClients/youtubeHttpClient";
import "./VideoDetails.scss"

class VideoDetails extends React.Component {
    render() {
        if (!this.props.video) {
            return null;
        }
        
        return (
          <div className="video-details">
              <div className="ui embed">
                  <iframe src={this.getEmbedUrl()} title="Video player"/>
              </div>
              <div className="ui segment">
                  <h4 className="ui header">
                      {this.props.video.snippet.title}
                  </h4>
                  <p>
                      {this.props.video.snippet.description}
                  </p>
              </div>
          </div>  
        );
    }
    
    getEmbedUrl() {
        return youtubeHttpClient.getEmbedUrl(this.props.video.id.videoId);
    }
}

export default VideoDetails