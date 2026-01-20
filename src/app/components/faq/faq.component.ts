import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-faq',
    standalone: true,
    imports: [TranslateModule],
    templateUrl: './faq.component.html',
    styleUrl: './faq.component.css'
})
export class FaqComponent {
  questionItems = [
    { id: '1', question: 'FAQ.Q1', answer: 'FAQ.A1', list: ''},
    { id: '2', question: 'FAQ.Q2', answer: 'FAQ.A2', list: ''},
    { id: '3', question: 'FAQ.Q3', answer: 'FAQ.A3', list: ''},
    { id: '4', question: 'FAQ.Q4', answer: 'FAQ.A4', list: ''},
    { id: '5', question: 'FAQ.Q5', answer: 'FAQ.A5', list: ''},
    { id: '6', question: 'FAQ.Q6', answer: 'FAQ.A6', list: ''},
    { id: '7', question: 'FAQ.Q7', answer: 'FAQ.A7', list: ''},
    { id: '8', question: 'FAQ.Q8', answer: 'FAQ.A8', list: ''},
    { id: '9', question: 'FAQ.Q9', answer: 'FAQ.A9', list: ['A9_1', 'A9_2']},
    { id: '10', question: 'FAQ.Q10', answer: 'FAQ.A10', list: ''},
    { id: '11', question: 'FAQ.Q11', answer: 'FAQ.A11', list: ''},
    { id: '12', question: 'FAQ.Q12', answer: 'FAQ.A12', list: ''}
  ];
}
