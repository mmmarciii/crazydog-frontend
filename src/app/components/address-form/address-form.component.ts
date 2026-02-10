import { Component, Input, OnInit, inject, DestroyRef } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address-form',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './address-form.component.html',
  styleUrl:'../quote-form/quote-form.component.css'
})
export class AddressFormComponent implements OnInit{
  @Input() parentForm!: FormGroup;
  @Input() prefix: string = '';

  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  private countryCodes: { [key: string]: string } = {
    'Albania': 'AL',
    'Andorra': 'AD',
    'Austria': 'AT',
    'Belarus': 'BY',
    'Belgium': 'BE',
    'Bosnia': 'BA',
    'Bulgaria': 'BG',
    'Croatia': 'HR',
    'Cyprus': 'CY',
    'Czech Republic': 'CZ',
    'Denmark': 'DK',
    'Estonia': 'EE',
    'Finland': 'FI',
    'France': 'FR',
    'Germany': 'DE',
    'Greece': 'GR',
    'Hungary': 'HU',
    'Iceland': 'IS',
    'Ireland': 'IE',
    'Italy': 'IT',
    'Latvia': 'LV',
    'Liechtenstein': 'LI',
    'Lithuania': 'LT',
    'Luxembourg': 'LU',
    'Malta': 'MT',
    'Moldova': 'MD',
    'Monaco': 'MC',
    'Montenegro': 'ME',
    'Netherlands': 'NL',
    'North Macedonia': 'MK',
    'Norway': 'NO',
    'Poland': 'PL',
    'Portugal': 'PT',
    'Romania': 'RO',
    'San Marino': 'SM',
    'Serbia': 'RS',
    'Slovakia': 'SK',
    'Slovenia': 'SI',
    'Spain': 'ES',
    'Sweden': 'SE',
    'Switzerland': 'CH',
    'Ukraine': 'UA',
    'United Kingdom': 'GB'
  };

  countries: string[] = [];

  ngOnInit() {
    this.countries = Object.keys(this.countryCodes);
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
