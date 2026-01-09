import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service'; 
import { FileUploadComponent } from '../../components/file-upload/file-upload.component'
import { ClientInfoComponent } from '../client-info/client-info.component';
import { AddressFormComponent } from '../address-form/address-form.component'

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
  uploadedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
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
      shippingHouseNumber: ['']
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

  onSubmit() {
    if (this.quoteForm.valid) {
      const formData = new FormData();
      
      
      
      this.uploadedFiles.forEach(file => {
        formData.append('images', file, file.name);
      });

      console.log('Küldés alatt...', formData);
    }
  }
}