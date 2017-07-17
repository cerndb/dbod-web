import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { InstancesComponent } from './instances.component';
import { BaCard } from '../../../theme/components/baCard/baCard.component';
import { InstanceService } from '../../../services/instance';

describe('InstancesComponent', () => {
  let component: InstancesComponent;
  let fixture: ComponentFixture<InstancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [Ng2SmartTableModule],
      declarations: [InstancesComponent, BaCard],
      providers: [InstanceService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
