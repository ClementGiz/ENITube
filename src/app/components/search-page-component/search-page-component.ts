import { Component, inject, signal } from '@angular/core';
import { VideoService } from '../../services/video-service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-page-component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './search-page-component.html',
  styleUrl: './search-page-component.css',
})
export class SearchPageComponent {
  private videoService = inject(VideoService);
  searchControl = new FormControl('');
  querySignal = signal<string>('');

  videoResource = httpResource<any>(() => {
    const currentQuery = this.querySignal();
    if (!currentQuery) return undefined;
    return this.videoService.getSearchUrl(currentQuery);
  });

  onSearch(event: Event): void {
    event.preventDefault();
    const value = this.searchControl.value?.trim();

    if (value) {
      this.querySignal.set(value);
    }
  }
}
