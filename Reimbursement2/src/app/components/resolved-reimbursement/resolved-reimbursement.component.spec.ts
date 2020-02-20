import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolvedReimbursementComponent } from './resolved-reimbursement.component';

describe('ResolvedReimbursementComponent', () => {
  let component: ResolvedReimbursementComponent;
  let fixture: ComponentFixture<ResolvedReimbursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolvedReimbursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolvedReimbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
