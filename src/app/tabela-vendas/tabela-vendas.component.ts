import { Component, OnInit } from '@angular/core';
import { VendasService } from '../services/vendasservice.service';
import { Venda } from '../models/venda';

@Component({
  selector: 'app-tabela-vendas',
  templateUrl: './tabela-vendas.component.html',
  styleUrls: ['./tabela-vendas.component.css']
})
export class TabelaVendasComponent implements OnInit {

  constructor(private service: VendasService) {  }

  erro: any;
  public vendas: Venda[];
  ngOnInit(): void {

    this.service.getVendas().subscribe((data: any) => {
      this.vendas = data.vendas
    }, (error: any) => {
        this.erro = error;
        console.log('ERROR', error);            
    }); 
  
  }

}
