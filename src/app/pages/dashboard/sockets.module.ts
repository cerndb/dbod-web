import { NgModule, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../../../environments/environment';

@Injectable()
export class SocketJobs extends Socket {
    constructor() {
        super({ url: environment.socketio_url+'/jobs', options: {autoConnect:false} });
    }
}

@NgModule({
  imports: [
    SocketIoModule,
  ],
  providers: [
    SocketJobs,
  ],
})

export class SocketsModule {}