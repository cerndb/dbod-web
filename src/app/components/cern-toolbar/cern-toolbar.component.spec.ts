import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CernToolbarComponent } from './cern-toolbar.component';

describe('CERN TOOLBAR COMPONENT', () => {
  let component: CernToolbarComponent;
  let fixture: ComponentFixture<CernToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CernToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CernToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

