import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../services/video-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { httpResource } from '@angular/common/http';

@Component({
  selector: 'app-video-page-component',
  imports: [],
  templateUrl: './video-page-component.html',
  styleUrl: './video-page-component.css',
})
export class VideoPageComponent {
  private route = inject(ActivatedRoute);
  private videoService = inject(VideoService);
  private sanitizer = inject(DomSanitizer);

  public videoId = toSignal(this.route.params.pipe(map((params) => params['id'] as string)));

  videoUrl = computed<SafeResourceUrl | undefined>(() => {
    const id = this.videoId();
    return id ? this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${id}?autoplay=1`,
        )
      : undefined;
  });

  videoDetailsResource = httpResource<any>(() => {
    const id = this.videoId();
    if (!id) return undefined;
    return this.videoService.getVideoDetailsUrl(id);
  });
}
