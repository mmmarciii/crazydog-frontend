import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  imports: [ReactiveFormsModule],
  templateUrl: './address-form.component.html',
  styleUrl:'../quote-form/quote-form.component.css'
})
export class AddressFormComponent {
  @Input() parentForm!: FormGroup;
  @Input() prefix: string = '';

  isFieldInvalid(fieldName: string): boolean {
  const control = this.parentForm.get(this.prefix + fieldName);
  return !!(control && control.invalid && (control.touched || control.dirty));
  }

  getErrorMessage(fieldName: string): string {
    const control = this.parentForm.get(this.prefix + fieldName);
    
    if (!control?.errors) return '';
    
    if (control.errors['required']) {
      return `${fieldName} is required`;
    }
    
    return 'Invalid field';
  }

}
