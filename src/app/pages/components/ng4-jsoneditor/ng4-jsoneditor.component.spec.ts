import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng4JsoneditorComponent } from './ng4-jsoneditor.component';

describe('Ng4JsoneditorComponent', () => {
  let component: Ng4JsoneditorComponent;
  let fixture: ComponentFixture<Ng4JsoneditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng4JsoneditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng4JsoneditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
