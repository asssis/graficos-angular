import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venda } from '../models/venda';
 @Injectable({
    providedIn: 'root'
 })

export class VendasService {

 produto = "";
  constructor(private http: HttpClient) {}
   getVendas(): Observable<any>
   { 
      return  this.http.get("http://104.214.39.0:3000/dados");
   }
   setVendas(venda: Venda) {      
      var dados =  this.getVendas().subscribe(data => {
      if(data != null)
       {
         var vendas =  data['vendas'];
         var objetivos = data['objetivos']; 
          vendas.push(venda);
          var dados =  {objetivos: objetivos, vendas: vendas}

         this.http.post('http://104.214.39.0:3000/dados', dados).subscribe(data => {
            console.log(data);            
         }, (error: any) => {
            console.log('ERROR', error);            
        });
       }
       }, (error: any) => {
           console.log('ERROR', error);            
       }); 
   }
}