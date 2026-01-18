import { Component } from '@angular/core';


@Component({
    selector: 'app-orderProcess',
    standalone: true,
    imports: [],
    templateUrl: './orderProcess.component.html',
    styleUrl: './orderProcess.component.css'
})
export class OrderProcessComponent {
  processItems = [
    { 
      name: 'Getting Started', 
      link: 'images/orderProcess/list.svg', 
      order: 'imageFirst', 
      desc: 'Contact us via the form, Instagram, or email. Depending on availability, sourcing the shoes usually takes 1–2 weeks. If you would like us to purchase the shoes for you, the shoe price must be paid in advance. If you already own a pair you’d like painted, we can work with that as well, provided the shoe is suitable for the requested design.',
      note: 'Important: When filling out the form, please specify the shoe model as accurately as possible (e.g. Nike Air Force 1 ’07).'
    },
    { 
      name: 'Design', 
      link: 'images/orderProcess/design.svg', 
      order: 'imageLast', 
      desc: 'Based on the information you provide, we create a digital mockup of your shoes. This allows you to see exactly how the final design will look on the selected model. Minor changes are included; however, creating a completely new concept involves an additional fee.',
      note: 'Price: Design fee for 1 custom concept: €40, payable in advance.If you choose from one of our previously created designs, the design fee is waived.'
    },
    { 
      name: 'Painting & Production', 
      link: 'images/orderProcess/draw.svg', 
      order: 'imageFirst', 
      desc: 'Once your order is approved, production takes approximately 15–20 business days. If you have a specific deadline, please let us know in advance so we can schedule your order accordingly.'
    },
    { 
      name: 'Payment & Shipping', 
      link: 'images/orderProcess/delivery.svg', 
      order: 'imageLast', 
      desc: 'Payment is made in two stages:',
      list: [
        'After contacting us and submitting your ideas, but before the design phase: One-time design fee via bank transfer to the account listed under “Contact.”',
        'After your design has been completed and approved, but before production starts: Payment of the shoe price, shipping cost, and production fee via bank transfer.'
      ],
      note: 'All finished shoes are carefully packaged and shipped by courier to the address you provide.'
    },
  ];

}
