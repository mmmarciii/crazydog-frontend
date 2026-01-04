import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-how-we-work',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-we-work.component.html',
  styleUrl: './how-we-work.component.css'
})
export class HowWeWorkComponent {
  processItems = [
    { name: 'process1', link: 'images/products/leopard-v4-1-1.png', order: 'imageFirst', desc: '<p class="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis consequatur eligendi quisquam doloremque vero ex debitis veritatis placeat unde animi laborum sapiente illo possimus, commodi dignissimos obcaecati illum maiores corporis.</p><p><strong>Doloremque vero ex debitis veritatis?</strong></p> <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod itaque voluptatenesciunt laborum incidunt. Officia, quam consectetur. Earum eligendi aliquam illum alias, unde optio accusantium soluta, iusto molestiae adipisci et?</p>'},
    { name: 'process1', link: 'images/products/star-wars-v3-1-1.jpg', order: 'imageLast', desc: '<p class="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis consequatur eligendi quisquam doloremque vero ex debitis veritatis placeat unde animi laborum sapiente illo possimus, commodi dignissimos obcaecati illum maiores corporis.</p><p><strong>Doloremque vero ex debitis veritatis?</strong></p> <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod itaque voluptatenesciunt laborum incidunt. Officia, quam consectetur. Earum eligendi aliquam illum alias, unde optio accusantium soluta, iusto molestiae adipisci et?</p>'},
    { name: 'process1', link: 'images/products/labubu-v1.jpg', order: 'imageFirst', desc: '<p class="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis consequatur eligendi quisquam doloremque vero ex debitis veritatis placeat unde animi laborum sapiente illo possimus, commodi dignissimos obcaecati illum maiores corporis.</p><p><strong>Doloremque vero ex debitis veritatis?</strong></p> <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod itaque voluptatenesciunt laborum incidunt. Officia, quam consectetur. Earum eligendi aliquam illum alias, unde optio accusantium soluta, iusto molestiae adipisci et?</p>'},
  ];

}
