import { Component, OnInit, Input, Inject } from '@angular/core';
import { StateButtonComponent } from '../../components/state-button/state-button.component';
import { SocketJobs } from '../sockets.module';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  providers: [SocketJobs],
})
export class JobsComponent implements OnInit {

  source = new Array();
  numberOfItems: number;
  pageLength: number;
  id: number;
  page :number;
  opened: boolean;

  filters: string = '';

  constructor(@Inject(SocketJobs) private socket, private authService: AuthenticationService) {
  
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
    });

    this.authService.loadUser().then( () => {
      this.socket.emit('getter', {jwt: this.authService.user.jwt, id: this.id, size: this.pageLength, from: (this.page-1)*this.pageLength, filters:this.filters});
    })
  }

  pageChanged(page) {
    this.opened = false;
    if(!isNaN(page)) {
      this.socket.emit('getter', {size: this.pageLength, from: (this.page-1)*this.pageLength, filters:this.filters});
    }
  }

  changeItemsPerPage(e) {
    this.opened = false;
    this.pageLength = e.value;
    this.socket.emit('getter', {id: this.id, size: this.pageLength, from: (this.page-1)*this.pageLength, filters:this.filters});
  }

  panelOpened() {
    this.opened = true;
  }

  panelClosed() {
    this.opened = false;
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
    this.socket.emit('getter', {id: this.id, size: this.pageLength, from: (this.page-1)*this.pageLength, filters:this.filters});
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }
}
