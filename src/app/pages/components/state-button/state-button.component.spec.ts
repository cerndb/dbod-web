import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateButtonComponent } from './state-button.component';

describe('STATE BUTTON COMPONENT', () => {
  let component: StateButtonComponent;
  let fixture: ComponentFixture<StateButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
