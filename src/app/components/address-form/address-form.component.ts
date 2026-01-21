import { Component, Input, OnInit, inject, DestroyRef } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-address-form',
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './address-form.component.html',
  styleUrl:'../quote-form/quote-form.component.css'
})
export class AddressFormComponent implements OnInit{
  @Input() parentForm!: FormGroup;
  @Input() prefix: string = '';

  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  private countryCodes: { [key: string]: string } = {
    'Hungary': 'HU',
    'Austria': 'AT',
    'Germany': 'DE'
  };

  ngOnInit() {
    this.setupZipLookup();
  }

  private setupZipLookup() {
    const zipControl = this.parentForm.get(this.prefix + 'Zip');
    const countryControl = this.parentForm.get(this.prefix + 'Country');

    if (!zipControl || !countryControl) return;

    zipControl.valueChanges.pipe(
      debounceTime(400),           
      distinctUntilChanged(),      
      filter(zip => zip && zip.length >= 4), 
      switchMap(zip => {
        const countryName = countryControl.value;
        const code = this.countryCodes[countryName] || 'HU';

        return this.http.get(`https://api.zippopotam.us/${code}/${zip}`).pipe(
          catchError(() => {
            return of(null); 
          })
        );
      }),
      takeUntilDestroyed(this.destroyRef) 
    ).subscribe({
      next: (data: any) => {
        if (data && data.places && data.places.length > 0) {
          this.parentForm.patchValue({
            [this.prefix + 'City']: data.places[0]['place name']
          });
        }
      }
    });
  }

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
