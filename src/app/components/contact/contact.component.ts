import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

onSubmit() {
    if (this.contactForm.valid) {
      console.log('Sending...', this.contactForm.value);
      
      this.contactService.sendEmail(this.contactForm.value).subscribe({
        next: (response) => {
          alert('Message sent succesfully!');
          this.contactForm.reset();
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
