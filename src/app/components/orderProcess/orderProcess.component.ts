import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';


@Component({
    selector: 'app-orderProcess',
    standalone: true,
    imports: [TranslateModule],
    templateUrl: './orderProcess.component.html',
    styleUrl: './orderProcess.component.css'
})
export class OrderProcessComponent {
  processItems = [
    { 
      name: 'ORDERPROCESS.STEP1.TITLE', 
      link: 'images/orderProcess/Start.webp', 
      order: 'imageFirst', 
      desc: 'ORDERPROCESS.STEP1.DESC',
      note: 'ORDERPROCESS.STEP1.NOTE'
    },
    { 
      name: 'ORDERPROCESS.STEP2.TITLE', 
      link: 'images/orderProcess/Design.webp', 
      order: 'imageLast', 
      desc: 'ORDERPROCESS.STEP2.DESC',
      note: 'ORDERPROCESS.STEP2.NOTE'
    },
    { 
      name: 'ORDERPROCESS.STEP3.TITLE', 
      link: 'images/orderProcess/Paint.webp', 
      order: 'imageFirst', 
      desc: 'ORDERPROCESS.STEP3.DESC',
      note: 'ORDERPROCESS.STEP3.NOTE'
    },
    { 
      name: 'ORDERPROCESS.STEP4.TITLE', 
      link: 'images/orderProcess/Payment&delivery.webp', 
      order: 'imageLast', 
      desc: 'ORDERPROCESS.STEP4.DESC',
      list: [
        'ORDERPROCESS.STEP4.LIST.ITEM1',
        'ORDERPROCESS.STEP4.LIST.ITEM2'
      ],
      note: 'ORDERPROCESS.STEP4.NOTE'
    },
  ];

}
