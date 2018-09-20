import { Component, OnInit, Input, ViewEncapsulation, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDialog} from '@angular/material';
import { InstanceDialogComponent } from './instance-dialog/instance-dialog.component';
import {MatCheckbox} from '@angular/material';
import {MatSlideToggle} from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { InstanceStartStopDialogComponent } from './instance-start-stop-dialog/instance-start-stop-dialog.component';
import { InstanceExpiryDateDialogComponent } from './instance-expiry-date-dialog/instance-expiry-date-dialog.component';
import { SocketInstance } from './sockets.module';

import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'instance',
  styleUrls: ['./instance.scss'],
  templateUrl: './instance.html',
  encapsulation: ViewEncapsulation.None,
  providers: [SocketInstance],
})

export class InstanceComponent implements OnInit {
  dbName: String;
  data:any = {};
  editedData:any = {};
  buttonDisabled: boolean = false;

  constructor(private authService: AuthenticationService, private route: ActivatedRoute, private router: Router, @Inject(SocketInstance) private socket, public dialog: MatDialog) {}

  loadData() {
    this.authService.loadUser().then( () => {
      this.socket.emit('getter', {jwt: this.authService.user.jwt, name: this.dbName});
    });
  }

  ngOnInit() {
    this.socket.connect();

    this.socket.on('instance', (data) => {
      this.data = JSON.parse(data);
      this.editedData = JSON.parse(data); // this.editedData = this.data doesn't give the same behaviour :o

      var currentDate = new Date();
      var maxDate = new Date(currentDate);
      var exp = this.data.expiry_date;
      var expiryDate = new Date(exp);

      maxDate.setFullYear(maxDate.getFullYear()+1);
      expiryDate.setMonth(expiryDate.getMonth()+6);

      if(expiryDate > maxDate){
        this.buttonDisabled = true;
      }

    });

    this.route.params.subscribe(params => {
      this.dbName = params['id'];
      this.loadData();
    });
  }

  changeField(name,value) {
    const dialogRef = this.dialog.open(InstanceDialogComponent, {
      data: {
        id: this.data.id,
        fieldName: name,
        attribute: false,
        precContent: this.data[name],
        newContent: value,
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadData();
    })
  }

  changeAttributeField(name,value) {
    const dialogRef = this.dialog.open(InstanceDialogComponent, {
      data: {
        id: this.data.id,
        fieldName: name,
        attribute: true,
        precContent: this.data.attributes[name],
        newContent: value,
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadData();
    })
  }

  checkDate(name, value) {
    var inputDate = new Date(value);
    var currentDate = new Date();
    var maxDate = new Date(currentDate);
    maxDate.setFullYear(maxDate.getFullYear()+1);

    if(inputDate <= maxDate && inputDate >= currentDate){
      this.buttonDisabled = false;
      return this.changeExpiryDate(name, inputDate);
    } else
    if(inputDate < currentDate){
      const dialogRef = this.dialog.open(InstanceExpiryDateDialogComponent, {
        data: {
          expiryDate: 0
        }
      });
      dialogRef.afterClosed().subscribe(() => {
        this.loadData();
      })
    } else if(inputDate > maxDate){
      const dialogRef = this.dialog.open(InstanceExpiryDateDialogComponent, {
        data: {
          expiryDate: 1
        }
      });
      dialogRef.afterClosed().subscribe(() => {
        this.loadData();
      })
    } else if(value == '' && this.data.category == 'PROD'){
      this.buttonDisabled = false;
      const dialogRef = this.dialog.open(InstanceDialogComponent, {
        data: {
          id: this.data.id,
          fieldName: name,
          attribute: false,
          precContent: this.data.attributes[name],
          newContent: null,
        }
      });
      dialogRef.afterClosed().subscribe(() => {
        this.loadData();
      })
    } else {
      const dialogRef = this.dialog.open(InstanceExpiryDateDialogComponent, {
        data: {
          expiryDate: 2
        }
      });
      dialogRef.afterClosed().subscribe(() => {
        this.loadData();
      })
    }

  }

  changeExpiryDate(name, value) {
    const dialogRef = this.dialog.open(InstanceDialogComponent, {
      data: {
        id: this.data.id,
        fieldName: name,
        attribute: false,
        precContent: this.data[name],
        newContent: value,
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadData();
    })
  }

  extendDate(name, value) {

    const dialogRef = this.dialog.open(InstanceDialogComponent, {
      data: {
        id: this.data.id,
        fieldName: name,
        attribute: false,
        precContent: this.data[name],
        newContent: this.extend(this.data[name]),
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadData();
    })
  }

  extend(date) {
    if(date != null){
      var expiryDate = new Date(date);
      expiryDate.setMonth(expiryDate.getMonth()+6);
      return expiryDate;
    } else{
      var currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth()+6);
      return currentDate;
    }
  }

  startStopInstance(value) {
    const dialogRef = this.dialog.open(InstanceStartStopDialogComponent, {
      data: {
        instanceName: this.data.name,
        startStopFlag: value,
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadData();
    })
  }
}
