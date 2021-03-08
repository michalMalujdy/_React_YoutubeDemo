import axios from "axios";

const baseURL = "https://www.googleapis.com/youtube/v3";
const key = "AIzaSyBpkvPBHCfJL6UtFYWOzGKAN7gNV9u1_hc"

class YoutubeHttpClient {
    constructor() {
        this.httpClient = axios.create({
            baseURL: baseURL,
            params: {
                part: "snippet",
                key: key
            }
        });
    }
    
    getVideos(searchTerm, maxResults = 10, pageToken = '') {        
        const config = {
            params: {
                q: searchTerm,
                pageToken: pageToken,
                maxResults: maxResults
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