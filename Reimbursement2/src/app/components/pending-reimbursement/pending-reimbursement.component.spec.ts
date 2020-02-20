import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingReimbursementComponent } from './pending-reimbursement.component';

describe('PendingReimbursementComponent', () => {
  let component: PendingReimbursementComponent;
  let fixture: ComponentFixture<PendingReimbursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingReimbursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingReimbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
