import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { JobsComponent } from './jobs.component';
import { BaCard } from '../../../theme/components/baCard/baCard.component';
import { JobService } from '../../../services/job';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpModule } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { By } from '@angular/platform-browser';

describe('JOBS COMPONENT', () => {
  let component: JobsComponent;
  let fixture: ComponentFixture<JobsComponent>;

  const jobs = [{
      instance_id: 1,
      execution_id: 9000,
      command_name: 'BACKUP',
      creation_date: '2017-04-01 12:00:00.1000',
      completion_date: '2017-04-01 12:00:00.1000',
      state: 'FINISHED_OK', 
  },
  {
      instance_id: 2,
      execution_id: 9001,
      command_name: 'BACKUP',
      creation_date: '2017-04-01 12:00:00.1000',
      completion_date: '2017-04-01 12:00:00.1000',
      state: 'PENDING',
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [Ng2SmartTableModule],
      declarations: [JobsComponent, BaCard],
      providers: [JobService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('JOBS: Smart Table Settings', () => {

    it('should have INSTANCE ID, EXECUTION ID, COMMAND NAME, CREATION DATE, COMPLETION DATE and STATE fields', () => {
      
      const actualKeys = Object.keys(component.settings.columns).sort();

      const expectedKeys = [
        'instance_id',
        'execution_id',
        'command_name',
        'creation_date',
        'completion_date',
        'state',
        ].sort();

        expect(actualKeys).toEqual(expectedKeys); 
    });

    it('should NOT show subheader', () => {
      expect(component.settings.hideSubHeader).toBeTruthy();
    });

    it('should NOT show add, delete, edit buttons', () => {
      expect(component.settings.actions.add).toBeFalsy();
      expect(component.settings.actions.edit).toBeFalsy();
      expect(component.settings.actions.delete).toBeFalsy();
    });

  });

  describe('JOBS: Functional Specs', () => {

    it('should search jobs with onSearch() method', fakeAsync(() => {
        
        const service = fixture.debugElement.injector.get(JobService);
        spyOn(service, 'getJobs').and.returnValue(Observable.of(jobs));
        fixture.detectChanges();
        tick();
      
        let de = fixture.debugElement.query(By.css('.form-control'));
        let el: HTMLElement = de.nativeElement;
        el.setAttribute('value', 'pending');
        component.onSearch(el.getAttribute('value'));
        expect(component.source.count()).toBe(1);
        
    }));

  });

});
