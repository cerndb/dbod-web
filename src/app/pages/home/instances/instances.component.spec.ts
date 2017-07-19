import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { InstancesComponent } from './instances.component';
import { BaCard } from '../../../theme/components/baCard/baCard.component';
import { InstanceService } from '../../../services/instance';
import { HttpModule } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';

describe('INSTANCES COMPONENT', () => {
  let component: InstancesComponent;
  let fixture: ComponentFixture<InstancesComponent>;

  const instances = [{
        db_name: 'pinocho',
        hosts: 'host1',
        username: 'user1',
        class: 'REF',
        db_type: 'MYSQL',
        state: 'RUNNING',
      },
      { 
        db_name: 'gepeto',
        hosts: 'host2',
        username: 'user2',
        class: 'REF',
        db_type: 'MYSQL',
        state: 'BUSY',
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, Ng2SmartTableModule],
      declarations: [InstancesComponent, BaCard],
      providers: [InstanceService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstancesComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('INSTANCES: Smart Table Settings', () => {

    it('should have DB NAME, HOSTS, USERNAME, CLASS, DB TYPE and STATE fields', () => {
      
      const actualKeys = Object.keys(component.settings.columns).sort();

      const expectedKeys = [
        'db_name',
        'hosts',
        'username',
        'class',
        'db_type',
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

  describe('INSTANCES: Functional Specs', () => {

    it('should set the source data via instance service', fakeAsync(() => {

        const service = fixture.debugElement.injector.get(InstanceService);
        spyOn(service, 'getInstances').and.returnValue(Observable.of(instances));
        fixture.detectChanges();
        tick();
        expect(component.source.count()).toBe(instances.length);
        
    }));

    it('should search instances with onSearch() method', fakeAsync(() => {

        const service = fixture.debugElement.injector.get(InstanceService);
        spyOn(service, 'getInstances').and.returnValue(Observable.of(instances));
        fixture.detectChanges();
        tick();
      
        let de = fixture.debugElement.query(By.css('.form-control'));
        let el: HTMLElement = de.nativeElement;
        el.setAttribute('value', 'pinocho');
        component.onSearch(el.getAttribute('value'));
        expect(component.source.count()).toBe(1);

    }));

  });

});
