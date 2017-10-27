import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ESComponent } from './ES.component';
import { BaCard } from '../../theme/components/baCard/baCard.component';
import { ESService } from '../../services/ES';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpModule } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Http } from '@angular/http'; 
import { Response, Headers, RequestOptions } from '@angular/http';

class ESServiceStub {
    http: Http;

    getES(): Observable<any> {
    return this.http.get('assets/ES-info.json').map((res: any) => res.map(res2 => res2._source).json());
 }
}
class ActivatedRouteStubES {

    // ActivatedRoute.params is Observable
    private subject = new BehaviorSubject(this.testParams);
    params = this.subject.asObservable();

    // Test parameters
    private _testParams: {};
    get testParams() { return this._testParams; }
    set testParams(params: {}) {
        this._testParams = params;
        this.subject.next(params);
    }

    // ActivatedRoute.snapshot.params
    get snapshot() {
        return { params: this.testParams };
    }
    // ActivatedRoute.parent.params
    get parent() {
        return { params: this.subject.asObservable() };
    }
}

describe('ES COMPONENT', () => {
    let component: ESComponent;
    let fixture: ComponentFixture<ESComponent>;
    let activatedRoute;


    const ES = [{
        db_name: 'testname',
        host: 'randomhost',
        source: 'nosource',
        type: 'mylog',
        '@timestamp': '2017-10-23T07:27:26.101Z',
        'message': '2017-10-23T07:27:25.209789Z 0 [Note] InnoDB: 5.7.15 started; log sequence number 7627766415',
        tags: ['beats_input_codec_plain_applied', 'matched'],
        'sort': [1505157232100]
    }];

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [HttpModule, RouterTestingModule.withRoutes([{ path: 'instance/:id', component: ESComponent }])],
            declarations: [ESComponent],
            providers: [{ provide: ActivatedRoute, useClass: ActivatedRouteStubES },
            { provide: Router }, // ]
            { provide: ESService , useClass: ESServiceStub }], 
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ESComponent);
        component = fixture.componentInstance;
        activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
        activatedRoute.testParams = { id: ES[0].db_name };
        //fixture.detectChanges();
    });


    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('ES: Smart Table Settings', () => {

        it('should have a message fields', () => {

            let includeElement = true;
            const actualKeys = Object.keys(component.settings.columns);
            const expectedKeys = [
                'message',
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

        it('should set the source data via ES service', fakeAsync(() => {

            const service = fixture.debugElement.injector.get(ESService);
            spyOn(service, 'getES').and.returnValue(Observable.of(ES));
            fixture.detectChanges();
            tick();
            let loo: Object[];
            const size = component.source.getAll().then(function (resp) {
                loo = resp;
                return loo.length; 
            } );            
            fixture.detectChanges();
            tick();
            expect(loo.length).toBe(ES.length);

        }));

        it('should search ES with onSearch() method', fakeAsync(() => {

            const service = fixture.debugElement.injector.get(ESService);
            spyOn(service, 'getES').and.returnValue(Observable.of(ES));
            fixture.detectChanges();
            tick();
            let loo: Object[];
            const size = component.source.getAll().then(function (resp) {
                loo = resp;
                return loo.length; 
            } );            
            fixture.detectChanges();
            tick();
            const de = fixture.debugElement.query(By.css('.form-control'));
            const el: HTMLElement = de.nativeElement;
            el.setAttribute('value', 'pending');
            component.onSearch(el.getAttribute('value'));            
            expect(loo.length).toBe(1);

        }));

    });

});
