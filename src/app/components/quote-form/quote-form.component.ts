import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service'; 
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { ClientInfoComponent } from '../client-info/client-info.component';
import { AddressFormComponent } from '../address-form/address-form.component';
import { QuoteFormService } from '../../services/quote-form.service';
import { TranslateModule } from '@ngx-translate/core';

declare var bootstrap: any;

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ClientInfoComponent,
    FileUploadComponent,
    AddressFormComponent,
    TranslateModule
],
  templateUrl: './quote-form.component.html',
  styleUrl: './quote-form.component.css'
})
export class QuoteFormComponent implements OnInit, AfterViewInit {
  quoteForm!: FormGroup;
  productItems: any[] = [];
  isSent = false;
  isLoading = false;
  uploadedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private quoteService: QuoteFormService,
  ) {}

  ngAfterViewInit() {
      setTimeout(() => {
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
        popoverTriggerList.forEach(el => {
          new bootstrap.Popover(el, {
            trigger: 'focus',
            content: () => {
              return el.getAttribute('data-bs-content') || el.getAttribute('title');
            }
          });
        });
      });
    }

  ngOnInit(): void {
    
    this.productItems = this.productService.getProducts();

    this.initForm();

    this.quoteForm.get('sameAsShipping')?.valueChanges.subscribe(isSame => {
      this.toggleShippingValidators(isSame);
    });
  }

  private initForm(): void {
    this.quoteForm = this.fb.group({
      // Product Selection
      shoeSource: ['Basic', Validators.required],
      shoeType: ['', Validators.required],
      shoeSize: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      notes: [''],
      // Client Info
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$')]],
      // Billing Address
      billingCountry: ['Austria', Validators.required],
      billingZip: ['', Validators.required],
      billingCity: ['', Validators.required],
      billingStreet: ['', Validators.required],
      billingHouseNumber: ['', Validators.required],
      // Shipping Toggle
      sameAsShipping: [true],
      // Shipping Address 
      shippingCountry: ['Austria'],
      shippingZip: [''],
      shippingCity: [''],
      shippingStreet: [''],
      shippingHouseNumber: [''],
      gdprConsent: [false, Validators.requiredTrue],
      termsConsent: [false, Validators.requiredTrue]
    });
  }

  private toggleShippingValidators(isSame: boolean): void {
    const shippingFields = [
      'shippingCountry', 'shippingZip', 'shippingCity', 
      'shippingStreet', 'shippingHouseNumber'
    ];

    shippingFields.forEach(fieldName => {
      const control = this.quoteForm.get(fieldName);
      if (isSame) {
        control?.clearValidators();
        control?.setValue('');
      } else {
        control?.setValidators(Validators.required);
      }
      control?.updateValueAndValidity();
    });
  }

  onFilesUploaded(files: File[]) {
    this.uploadedFiles = files;
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.quoteForm.get(fieldName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  getErrorMessage(fieldName: string): string {
    const control = this.quoteForm.get(fieldName);
    
    if (!control?.errors) return '';

    const errors = control.errors;

    if (errors['required']) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }
    if (errors['email']) {
      return 'Please enter a valid email address';
    }
    if (errors['pattern']) {
      if (fieldName === 'shoeSize') {
        return 'Shoe size must contain only numbers';
      }
      if (fieldName === 'phone') {
        return 'Please enter a valid phone number';
      }
    }
    
    return 'Invalid field';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      'shoeType': 'Shoe type',
      'shoeSize': 'Shoe size',
      'firstName': 'First name',
      'lastName': 'Last name',
      'email': 'Email',
      'phone': 'Phone number',
      'billingCountry': 'Billing country',
      'billingZip': 'Postal code',
      'billingCity': 'City',
      'billingStreet': 'Street',
      'billingHouseNumber': 'House number',
      'shippingCountry': 'Shipping country',
      'shippingZip': 'Postal code',
      'shippingCity': 'City',
      'shippingStreet': 'Street',
      'shippingHouseNumber': 'House number'
    };
    
    return labels[fieldName] || fieldName;
  }

  selectProduct(productName: string): void {
    this.quoteForm.get('shoeSource')?.setValue(productName);
  }

  onProductSelect(productName: string): void {
    this.quoteForm.get('shoeSource')?.setValue(productName);
  }


  onSubmit() {
    if (this.quoteForm.invalid) {
      this.quoteForm.markAllAsTouched();
      return;
    }
    
    if (this.quoteForm.value.middleName) {
      console.warn('Bot detected!');
      this.isLoading = true; 
      
      setTimeout(() => {
        this.isLoading = false;
        this.isSent = true; 
        this.quoteForm.reset({
          shoeSource: 'Basic',
          sameAsShipping: true,
          billingCountry: 'Austria',
          shippingCountry: 'Austria',
          gdprConsent: false,
          termsConsent: false
        });
      }, 1500); 
      return;
    }

    const formData = new FormData();
    this.isLoading = true;

    
    Object.keys(this.quoteForm.value).forEach(key => {
      if (key !== 'middleName') { 
        formData.append(key, this.quoteForm.value[key]);
      }
    });

    this.uploadedFiles.forEach(file => {
      formData.append('images[]', file, file.name);
    });

    this.quoteService.sendQuote(formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.isSent = true;
        this.quoteForm.reset({
          shoeSource: 'Basic',
          sameAsShipping: true,
          billingCountry: 'Austria',
          shippingCountry: 'Austria',
          gdprConsent: false,
          termsConsent: false
        });
        this.uploadedFiles = [];
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error submitting quote:', err);
      }
    });
  }
}