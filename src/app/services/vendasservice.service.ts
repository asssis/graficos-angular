import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
 @Injectable({
    providedIn: 'root'
 })

export class VendasService {

 produto = "";
  constructor(private http: HttpClient) {}
   getVendas(): Observable<any>
   { 
      return  this.http.get("http://34.95.209.145/:4000/dados");
   }
 
}
