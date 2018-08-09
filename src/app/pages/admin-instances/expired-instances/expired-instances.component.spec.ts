import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredInstancesComponent } from './expired-instances.component';

describe('ExpiredInstancesComponent', () => {
  let component: ExpiredInstancesComponent;
  let fixture: ComponentFixture<ExpiredInstancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiredInstancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredInstancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
