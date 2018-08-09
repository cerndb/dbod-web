import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingInstancesComponent } from './pending-instances.component';

describe('PendingInstancesComponent', () => {
  let component: PendingInstancesComponent;
  let fixture: ComponentFixture<PendingInstancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingInstancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingInstancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
