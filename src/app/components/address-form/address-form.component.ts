import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  imports: [],
  templateUrl: './address-form.component.html',
  styleUrl:'../quote-form/quote-form.component.css'
})
export class AddressFormComponent {
  @Input() parentForm!: FormGroup;
}
