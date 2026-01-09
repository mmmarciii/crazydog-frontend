import { Component } from '@angular/core';
import { QuoteFormComponent } from '../quote-form/quote-form.component'
declare var bootstrap: any;

@Component({
    selector: 'app-order',
    standalone: true,
    imports: [QuoteFormComponent],
    templateUrl: './order.component.html',
    styleUrl: './order.component.css'
})
export class OrderComponent {

    private myModal: any;
    
    
    openModal() {
        const modalElement = document.getElementById('quoteModal');
        
        const modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show();
    }

    closeModal() {
        if (this.myModal) {
        this.myModal.hide();
        }
    }
}
