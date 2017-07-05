import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbNameComponent } from './db-name.component';

describe('DbNameComponent', () => {
  let component: DbNameComponent;
  let fixture: ComponentFixture<DbNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
