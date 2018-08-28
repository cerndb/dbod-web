import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredPendingComponent } from './expired-pending.component';

describe('ExpiredPendingComponent', () => {
  let component: ExpiredPendingComponent;
  let fixture: ComponentFixture<ExpiredPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiredPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
