import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

    @Input() message:string = '';
    @Input() code:number = 200;
    @Output() closeAlertEvent = new EventEmitter<boolean>();
    
  constructor() { }

  ngOnInit() {
  }

  closeAlert(){
    this.closeAlertEvent.emit(true);
}

}
