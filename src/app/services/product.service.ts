import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {  Message, TipoAccion } from '../interfaces/products';
import { Product } from '../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    baseUrlProducts = environment.baseUrlProducts;
    author = 1;
    typeForm:TipoAccion;
    infoProductsEdit: Product;

    eventoFormulario: EventEmitter<Message> = new EventEmitter();

  constructor(private http: HttpClient) { }

  get headers(){
    return new HttpHeaders({'Content-Type':'application/json; charset=utf-8' , 'authorId':'1' });
  }

  getProductsFinancial(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrlProducts}/bp/products`, {headers: this.headers} );
  }

  deleteProduct(data: Pick<Product,'id'> ){
    return this.http.delete(`${this.baseUrlProducts}/bp/products`,{headers: this.headers, params: data});
  }

  createUpdateProducto(producto:Product,type:TipoAccion){
    if( type === TipoAccion.Create ){
        return this.http.post(`${this.baseUrlProducts}/bp/products`, producto, {headers: this.headers});
    }else{
        return this.http.put(`${this.baseUrlProducts}/bp/products`, producto, {headers: this.headers});
    }
    
  }

  


}
