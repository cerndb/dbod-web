import { NgModule, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../../../environments/environment';

@Injectable()
export class SocketLogs extends Socket {
    constructor() {
        super({ url: environment.socketio_url+'/logs', options: {autoConnect:false} });
    }
}

@Injectable()
export class SocketLogsStatistics extends Socket {
    constructor() {
        super({ url: environment.socketio_url+'/logs_statistics', options: {autoConnect:false} });
    }
}

@Injectable()
export class SocketJobs extends Socket {
    constructor() {
        super({ url: environment.socketio_url+'/jobs', options: {autoConnect:false} });
    }
}

@Injectable()
export class SocketInstance extends Socket {
    constructor() {
        super({ url: environment.socketio_url+'/instance', options: {autoConnect:false} });
    }
}

@NgModule({
  imports: [
    SocketIoModule,
  ],
  providers: [
    SocketLogs,
    SocketLogsStatistics,
    SocketJobs,
    SocketInstance,
  ],
})

export class SocketsModule {}