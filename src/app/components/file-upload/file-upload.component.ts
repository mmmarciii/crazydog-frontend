import { Component, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  @Output() filesChanged = new EventEmitter<File[]>();
  
  selectedFiles: File[] = [];
  imagePreviews: string[] = [];
  isDragOver = false;

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.processFiles(files);
  }

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    
    const files = event.dataTransfer?.files;
    if (files) {
      this.processFiles(files);
    }
  }

  private processFiles(files: FileList) {
    if (this.selectedFiles.length + files.length > 5) {
      alert("Max 5 kép engedélyezett");
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