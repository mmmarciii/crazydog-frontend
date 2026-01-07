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
    { name: 'Preparing', link: 'images/orderProcess/list.svg', order: 'imageFirst', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis consequatur eligendi quisquam doloremque vero ex debitis veritatis placeat unde animi laborum sapiente illo possimus, commodi dignissimos obcaecati illum maiores corporis. Doloremque vero ex debitis veritatis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod itaque voluptatenesciunt laborum incidunt. Officia, quam consectetur. Earum eligendi aliquam illum alias, unde optio accusantium soluta, iusto molestiae adipisci et?'},
    { name: 'Planning', link: 'images/orderProcess/design.svg', order: 'imageLast', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis consequatur eligendi quisquam doloremque vero ex debitis veritatis placeat unde animi laborum sapiente illo possimus, commodi dignissimos obcaecati illum maiores corporis. Doloremque vero ex debitis veritatis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod itaque voluptatenesciunt laborum incidunt. Officia, quam consectetur. Earum eligendi aliquam illum alias, unde optio accusantium soluta, iusto molestiae adipisci et?'},
    { name: 'Painting', link: 'images/orderProcess/draw.svg', order: 'imageFirst', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis consequatur eligendi quisquam doloremque vero ex debitis veritatis placeat unde animi laborum sapiente illo possimus, commodi dignissimos obcaecati illum maiores corporis. Doloremque vero ex debitis veritatis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod itaque voluptatenesciunt laborum incidunt. Officia, quam consectetur. Earum eligendi aliquam illum alias, unde optio accusantium soluta, iusto molestiae adipisci et?'},
    { name: 'Paying & Delivery', link: 'images/orderProcess/delivery.svg', order: 'imageLast', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis consequatur eligendi quisquam doloremque vero ex debitis veritatis placeat unde animi laborum sapiente illo possimus, commodi dignissimos obcaecati illum maiores corporis. Doloremque vero ex debitis veritatis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod itaque voluptatenesciunt laborum incidunt. Officia, quam consectetur. Earum eligendi aliquam illum alias, unde optio accusantium soluta, iusto molestiae adipisci et?'},
  ];

}
