import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { InstanceComponent } from './instance.component';
import { Router, ActivatedRoute } from '@angular/router';
import { InstanceService } from '../../services/instance';
import { HttpModule } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { NO_ERRORS_SCHEMA } from '@angular/core';

class InstanceServiceStub {
    getInstances() {
        return Observable.empty();
    }
}

class ActivatedRouteStub {

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

describe('InstanceComponent', () => {
  let component: InstanceComponent;
  let fixture: ComponentFixture<InstanceComponent>;
  let activatedRoute;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule, RouterTestingModule.withRoutes([{ path: 'instance/:id', component: InstanceComponent }])],
      declarations: [InstanceComponent],
      providers: [{ provide: ActivatedRoute, useClass: ActivatedRouteStub },
                  { provide: Router },
                  { provide: InstanceService, useClass: InstanceServiceStub }],
                  schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceComponent);
    component = fixture.componentInstance;
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    activatedRoute.testParams = { id: 'pinocho' };
    fixture.detectChanges();
  });

  it('should be created', () => {
      expect(component).toBeTruthy();
  });
});
