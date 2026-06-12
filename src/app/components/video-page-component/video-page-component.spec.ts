import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPageComponent } from './video-page-component';

describe('VideoPageComponent', () => {
  let component: VideoPageComponent;
  let fixture: ComponentFixture<VideoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
