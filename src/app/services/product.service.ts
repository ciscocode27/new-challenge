import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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

    eventoFormulario = new Subject<Message>();

  constructor(private http: HttpClient) { }

  get headers(){
    return new HttpHeaders({'Content-Type':'application/json; charset=utf-8' , 'authorId':'1' });
  }

  getProductsFinancial(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrlProducts}/bp/products`, {headers: this.headers} );
  }

  deleteProduct(data: Pick<Product,'id'> ): Observable<string>{
    return this.http.delete<string>(`${this.baseUrlProducts}/bp/products`,{headers: this.headers, params: data});
  }

  createUpdateProducto(producto:Product,type:TipoAccion): Observable<Product>{
    if( type === TipoAccion.Create ){
        return this.http.post<Product>(`${this.baseUrlProducts}/bp/products`, producto, {headers: this.headers});
    }else{
        return this.http.put<Product>(`${this.baseUrlProducts}/bp/products`, producto, {headers: this.headers});
    }
    
  }

  verifyExistProduct(idProduct:string){
    return this.http.get(`${this.baseUrlProducts}/bp/products/verification?id=${idProduct}`,{headers: this.headers});
  }

  


}
