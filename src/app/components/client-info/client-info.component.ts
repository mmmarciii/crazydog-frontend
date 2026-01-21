import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-client-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './client-info.component.html',
  styleUrl:'../quote-form/quote-form.component.css'
})
export class ClientInfoComponent {
  @Input() parentForm!: FormGroup;
  
  isFieldInvalid(fieldName: string): boolean {
    const control = this.parentForm.get(fieldName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }
}