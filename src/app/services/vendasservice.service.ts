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
      return  this.http.get("http://54.233.105.4:3000/dados");
   }
 
}
