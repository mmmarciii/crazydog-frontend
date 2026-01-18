import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.css'
})
export class ContactComponent {

  contactForm!: FormGroup;
  isSent = false;

  constructor(
    private fb: FormBuilder, 
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
      gdprConsent: [false, Validators.requiredTrue]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.contactForm.get(fieldName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  getErrorMessage(fieldName: string): string {
    const control = this.contactForm.get(fieldName);
    
    if (!control?.errors) return '';

    const errors = control.errors;

    if (errors['required']) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }
    if (errors['email']) {
      return 'Please enter a valid email address';
    }
    
    return 'Invalid field';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      'name': 'Name',
      'email': 'Email',
      'subject': 'Subject',
      'message': 'Message',
      'gdprConsent': 'GDPR Consent'
    };
    
    return labels[fieldName] || fieldName;
  }

onSubmit() {
    if (this.contactForm.valid) {
      console.log('Sending...', this.contactForm.value);
      
      this.contactService.sendEmail(this.contactForm.value).subscribe({
        next: (response) => {
          this.isSent = true;
          this.contactForm.reset({ gdprConsent: false });
        },
        error: (err) => {
          alert('Error with sending!');
          console.error(err);
        }
      });
    } else {
      alert('Please fill every field valid!');
    }
  }
}
