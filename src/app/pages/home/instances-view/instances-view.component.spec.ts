import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstancesViewComponent } from './instances-view.component';

describe('InstancesViewComponent', () => {
  let component: InstancesViewComponent;
  let fixture: ComponentFixture<InstancesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstancesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstancesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
