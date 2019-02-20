import { Component, OnInit, Input, Inject } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SocketJobs } from '../sockets.module';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'instance-jobs',
  templateUrl: './instance-jobs.component.html',
  styleUrls: ['./instance-jobs.component.scss'],
  providers: [SocketJobs],
})
export class InstanceJobsComponent implements OnInit {

  @Input() data: any;

  source = new Array();
  numberOfItems: number;
  pageLength: number;
  id: number;
  page :number;
  opened: boolean;
  loading: boolean = true;

  filters: string = '';

  constructor(private authService: AuthenticationService, @Inject(SocketJobs) private socket) {

  }

  ngOnInit() {
    this.socket.connect();

    this.opened = false;
    this.page = 1;
    this.pageLength = 10;

    this.socket.on('countjobs', (data) => {
      this.numberOfItems = JSON.parse(data);
    });

    this.socket.on('jobs', (data) => {
      if(!this.opened) {
        this.source = JSON.parse(data);
        // console.log('receive');
      }
      this.loading = false;
    });
  }

  pageChanged(page) {
    this.opened = false;
    if(!isNaN(page)) {
      this.authService.loadUser().then( () => {
        this.socket.emit('getter', {jwt: this.authService.user.jwt, id: this.id, size: this.pageLength, from: (this.page-1)*this.pageLength, filters:this.filters});
      });
    }
  }

  changeItemsPerPage(e) {
    this.opened = false;
    this.pageLength = e.value;
    this.authService.loadUser().then( () => {
      this.socket.emit('getter', {jwt: this.authService.user.jwt, id: this.id, size: this.pageLength, from: (this.page-1)*this.pageLength, filters:this.filters});
    });
  }

  panelOpened() {
    this.opened = true;
  }

  panelClosed() {
    this.opened = false;
  }

  ngOnChanges() {
    this.page = 1;
    this.pageLength = 10;
    if(this.data.hasOwnProperty('id')) {
      this.id = this.data.id;
      this.authService.loadUser().then( () => {
        this.socket.emit('getter', {jwt: this.authService.user.jwt, id: this.id, size: this.pageLength, from: (this.page-1)*this.pageLength, filters:this.filters});
      });
    }
  }

  changeFilters(value) {
    this.page = 1;
    if(value.length!=0) {
      this.filters = value;
    }
    else {
      this.filters = '';
    }
    this.opened = false;
    this.authService.loadUser().then( () => {
      this.socket.emit('getter', {jwt: this.authService.user.jwt, id: this.id, size: this.pageLength, from: (this.page-1)*this.pageLength, filters:this.filters});
    });
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }
}
