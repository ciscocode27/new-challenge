import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/interfaces/products';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    subscriptionForm: Subscription;
    showAlert:boolean = false;
    messageAlert:string = '';
    codeMsg:number = 200;

  constructor(private productServ: ProductService) { }

  ngOnInit() {
    this.subscriptionForm = this.productServ.eventoFormulario.subscribe((evt:Message)=>{
        if( evt  ){
            this.getShowAlert(evt.title,evt.code);
        }
    })
  }

  ngOnDestroy(): void {
    if( this.subscriptionForm ) this.subscriptionForm.unsubscribe();
 }

 closeAlert(event){
    this.showAlert = false;
}

getShowAlert(msg:string, code:number){
    this.codeMsg = code;
    this.showAlert = true;
    this.messageAlert = msg;
  }

}
