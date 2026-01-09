import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-client-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './client-info.component.html',
  styleUrl:'../quote-form/quote-form.component.css'
})
export class ClientInfoComponent {
  @Input() parentForm!: FormGroup;
}