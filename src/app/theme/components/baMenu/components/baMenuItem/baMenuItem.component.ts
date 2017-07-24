import {Component, Input, Output, EventEmitter} from '@angular/core';
import {GlobalState} from '../../../../../global.state';

@Component({
  selector: 'ba-menu-item',
  templateUrl: './baMenuItem.html',
  styleUrls: ['./baMenuItem.scss']
})
export class BaMenuItem {

  @Input() menuItem:any;
  @Input() child:boolean = false;

  @Output() itemHover = new EventEmitter<any>();
  @Output() toggleSubMenu = new EventEmitter<any>();

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;

  constructor(private _state:GlobalState) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public onHoverItem($event):void {
    this.itemHover.emit($event);
  }

  public onToggleSubMenu($event, item):boolean {
    $event.item = item;
    this.toggleSubMenu.emit($event);
    return false;
  }

  public toggleMenu() {
    
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
    
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }
}