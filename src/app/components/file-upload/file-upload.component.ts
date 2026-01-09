import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html'
})
export class FileUploadComponent {
  @Output() filesChanged = new EventEmitter<File[]>();
  
  selectedFiles: File[] = [];
  imagePreviews: string[] = [];

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (this.selectedFiles.length + files.length > 5) {
      alert("Max 5 images allowed");
      return;
    }

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        this.selectedFiles.push(file);
        const reader = new FileReader();
        reader.onload = () => this.imagePreviews.push(reader.result as string);
        reader.readAsDataURL(file);
      }
    });
    this.filesChanged.emit(this.selectedFiles);
  }

  removeImage(index: number) {
    this.selectedFiles.splice(index, 1);
    this.imagePreviews.splice(index, 1);
    this.filesChanged.emit(this.selectedFiles);
  }
}