import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit, OnChanges {
  @Input() images: string[] = [];

  public currentImage!: string;

  ngOnInit(): void {
    this.currentImage = this.images[0];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images']) {
      this.currentImage = this.images[0];
    }
  }

  public openImage(): void {
    window.open(this.currentImage, '_blank');
  }

  public nextImage(): void {
    const currentIndex = this.images.indexOf(this.currentImage);
    this.currentImage = this.images[currentIndex + 1] || this.images[0];
  }

  public previousImage(): void {
    const currentIndex = this.images.indexOf(this.currentImage);
    this.currentImage = this.images[currentIndex - 1] || this.images[this.images.length - 1];
  }
}
