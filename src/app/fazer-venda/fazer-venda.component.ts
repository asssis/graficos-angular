import { Component, OnInit } from '@angular/core';
import { VendasService } from '../services/vendasservice.service';
@Component({
  selector: 'app-fazer-venda',
  templateUrl: './fazer-venda.component.html',
  styleUrls: ['./fazer-venda.component.css']
})



export class FazerVendaComponent implements OnInit {
  constructor(private service: VendasService) { }

  venda: any = {
    produto: 'arroz',
    quantidade: '1',
    valor_unico: '2',
    mes: '1',

  };

  ngOnInit(): void {
  }
   
  onSubmit() {
    console.log(this.venda);
    this.service.setVendas(this.venda);
    window.location.href="/venda-tabela";
   }

}
