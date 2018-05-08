import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { CernToolbarComponent } from './cern-toolbar.component';

describe('CERN TOOLBAR COMPONENT', () => {
  let component: CernToolbarComponent;
  let fixture: ComponentFixture<CernToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [CernToolbarComponent],
      providers: [AuthenticationService],
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

