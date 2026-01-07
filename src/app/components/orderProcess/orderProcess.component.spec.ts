import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProcessComponent } from './orderProcess.component';

describe('HowWeWorkComponent', () => {
  let component: OrderProcessComponent;
  let fixture: ComponentFixture<OrderProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderProcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
