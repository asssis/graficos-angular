import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 @Injectable({
    providedIn: 'root'
 })

export class VendasService {
    
  constructor(private http: HttpClient) {}
   getVendas(): Observable<any>
   { 
      return  this.http.get("http://104.214.39.0:3000/dados");
   }
}