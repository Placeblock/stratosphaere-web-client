import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  imageCount = new Array(387);
  currentImageIndex = 0;
  showImageViewer = false;

  getSmallImageUrl(index: number) {
    return "/assets/gallery-small/gallery-"+index+"-small.webp";
  }

  getImageUrl(index: number) {
    return "/assets/gallery/gallery-"+index+"-small.webp";
  }

  showImage(index: number) {
    console.log(index);
    this.currentImageIndex = index;
    this.showImageViewer = true;
  }

  nextImage() {
    this.currentImageIndex = ++this.currentImageIndex % this.imageCount.length;
  }

  previousImage() {
    this.currentImageIndex = this.negativeMod(--this.currentImageIndex, this.imageCount.length);
    console.log(this.currentImageIndex);
  }

  negativeMod(n: number, max: number) {
    return ((n % max) + max) % max;
  };
}
