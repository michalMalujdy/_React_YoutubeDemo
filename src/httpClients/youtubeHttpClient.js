import axios from "axios";

const baseURL = "https://www.googleapis.com/youtube/v3";
const key = "AIzaSyCvgQQJEHMzHvwCTZdzNg56hPX8ZK0S43s"

class YoutubeHttpClient {
    constructor() {
        this.httpClient = axios.create({
            baseURL: baseURL,
            params: {
                part: "snippet",
                maxResults: 10,
                key: key
            }
        });
    }
    
    getVideos(searchTerm) {        
        const config = {
            params: {
                q: searchTerm
            }
        };
        
        return this.httpClient.get("search", config);
    }
    
    getEmbedUrl(videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
    }
}

const youtubeHttpClient = new YoutubeHttpClient();
Object.freeze(youtubeHttpClient);
export default youtubeHttpClient;