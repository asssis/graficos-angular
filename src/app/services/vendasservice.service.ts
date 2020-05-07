import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 @Injectable({
    providedIn: 'root'
 })

export class VendasService {
   public vendas: any;
    
  constructor(private http: HttpClient) {}
   getVendas(): Observable<any>
   { 
      return  this.http.get("http://localhost:3000/vendas");
   }
}