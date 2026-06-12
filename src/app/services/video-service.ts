import { Service } from '@angular/core';
import { environement } from '../environements/environement';

@Service()
export class VideoService {
  private baseUrl = 'https://www.googleapis.com/youtube/v3/search';
  private apiKey = environement.youtubeApiKey;

  getSearchUrl(query: string): string {
    return `${this.baseUrl}?part=snippet&maxResults=10&q=${encodeURIComponent(query)}&type=video&key=${this.apiKey}`;
  }

  getVideoDetailsUrl(videoId: string): string {
    return `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${this.apiKey}`;
  }
}
