import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ESComponent } from './ES.component';
import { BaCard } from '../../theme/components/baCard/baCard.component';
import { ESService } from '../../services/ES';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpModule } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { By } from '@angular/platform-browser';

describe('ES COMPONENT', () => {
  let component: ESComponent;
  let fixture: ComponentFixture<ESComponent>;


  const ES = [{
      _index: 'itdb_dbod-mylog-2017.09.11',
  _type: 'mylog',
  _id: 'AV5yXNgpwimHCeWJIWpg',
  _source:
      {
          type: 'mylog',
          tags: ['beats_input_codec_plain_applied', 'matched']},
  'sort': [1505157232100]}];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [Ng2SmartTableModule],
      declarations: [ESComponent, BaCard],
      providers: [ESService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ESComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ES: Smart Table Settings', () => {

    it('should have _index fields', () => {

      let includeElement = true;
      const actualKeys = Object.keys(component.settings.columns);
      const expectedKeys = [
        '_index',
      ];
      
      expectedKeys.forEach(element => {
          if (!actualKeys.includes(element)) {
            includeElement = false;
          }
      });


      expect(includeElement).toBeTruthy();
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

  describe('ES: Functional Specs', () => {

    it('should set the source data via job service', fakeAsync(() => {

        const service = fixture.debugElement.injector.get(ESService);
        spyOn(service, 'getES').and.returnValue(Observable.of(ES));
        fixture.detectChanges();
        tick();
        expect(component.source.count()).toBe(ES.length);
    
    }));

    it('should search ES with onSearch() method', fakeAsync(() => {
        
        const service = fixture.debugElement.injector.get(ESService);
        spyOn(service, 'getES').and.returnValue(Observable.of(ES));
        fixture.detectChanges();
        tick();
      
        const de = fixture.debugElement.query(By.css('.form-control'));
        const el: HTMLElement = de.nativeElement;
        el.setAttribute('value', 'pending');
        component.onSearch(el.getAttribute('value'));
        expect(component.source.count()).toBe(1);
        
    }));

  });

});
