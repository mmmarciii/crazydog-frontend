import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service'; 
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { ClientInfoComponent } from '../client-info/client-info.component';
import { AddressFormComponent } from '../address-form/address-form.component';
import { QuoteFormService } from '../../services/quote-form.service'; 

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ClientInfoComponent,
    FileUploadComponent,
    AddressFormComponent
],
  templateUrl: './quote-form.component.html',
  styleUrl: './quote-form.component.css'
})
export class QuoteFormComponent implements OnInit {
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
      shoeSize: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // Csak számok
      notes: [''],
      // Client Info
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
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
      gdprConsent: [false, Validators.requiredTrue]
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

  private findInvalidControls() {
    const invalid = [];
    const controls = this.quoteForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }


  onSubmit() {

    if (this.quoteForm.invalid) {

      this.quoteForm.markAllAsTouched();
      return;
    }

    if (this.quoteForm.valid) {
      const formData = new FormData();

      this.isLoading = true;

      Object.keys(this.quoteForm.value).forEach(key => {
        formData.append(key, this.quoteForm.value[key]);
      });

      this.uploadedFiles.forEach(file => {
        formData.append('images[]', file, file.name);
      });

      this.quoteService.sendQuote(formData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.isSent = true;
        },
        error: (err) => {
          this.isLoading = false;
        }
        
      });
    
    }
  }
}