import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  domain = 'http://localhost:3000/api/v1/products'
  Products:[];
  CartDetails;
  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();

  constructor(
    private http:HttpClient,
   
  ) { 
  }

  changeMessage(totalqty:number){
    this.messageSource.next(totalqty);
  }

  getTags(){
    return (this.http.get(this.domain +'/tags' ).map(res=>res));
  }
  getAllproducts(data){
    
    // const options = {
    //   headers:new HttpHeaders({'Content-Type':'application/json'}),
    //   params: new HttpParams().set('data',data)
    // }
     
    return this.http.get(this.domain+ `/all?tags=${data}`,).map(res=>res);
  }

  addToCart(id){
    return this.http.get(this.domain+ `/add-to-cart/${id}`).map(res=>res);
  }
  getSingleProduct(id){
    return this.http.get(this.domain+ `/cart/${id}`).map(res=>res);
  }

  



}
