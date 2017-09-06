import { Component, OnInit, Input } from '@angular/core';
import { ESService } from '../../services/ES';
import { StateButtonComponent } from '../../components/state-button/state-button.component';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ES',
  templateUrl: './ES.component.html',
  styleUrls: ['./ES.component.scss']
})
export class ESComponent implements OnInit {

  source: LocalDataSource;
  @Input() title: string;
  dbName: string;
  dbType: string;
  logType: string;
  settings = {
     columns: {
        host: { title: 'host' },
        source: { title: 'source' },
        message: { title: 'message' },
        type: { title: 'type' },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    hideSubHeader: true,
    noDataMessage: 'No instance found.',

  };

  constructor(private route: ActivatedRoute, private _ESService: ESService) {
    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.dbName = params['id'];
        this.dbType = params['id'];
        this.logType = 'mylog';
  });
  
  this._ESService.getES(this.dbName, this.dbType, this.logType).subscribe(res => {
    //console.log(res);
    this.source = new LocalDataSource(res);
  }, value => console.error(value), () => console.warn('this._ESService.getES().subscribe((res) completed'));
}
  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'host',
        search: query,
      },
      {
        field: 'source',
        search: query,
      }, 
      {
        field: 'message',
        search: query,
      },
      {
        field: 'type',
        search: query,
      },
    ], false);
    // second parameter specifying whether to perform 'AND' or 'OR' search
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
  }
  
}
