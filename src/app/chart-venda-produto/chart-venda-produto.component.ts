import { Component, OnInit } from '@angular/core';
import { VendasService } from '../services/vendasservice.service'
import { Venda } from '../models/venda'

@Component({
  selector: 'app-chart-venda-produto',
  templateUrl: './chart-venda-produto.component.html',
  styleUrls: ['./chart-venda-produto.component.css']
})



export class ChartVendaProdutoComponent implements OnInit {
 
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public vendas: Venda;

  public barChartLabels = [];
  public barChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartData = [];
  constructor(private service: VendasService) {  
    this.getter();
  }

  ngOnInit() {
  }


  erro: any;
 
  montar_grafico(objetos: any)
  {
    var vendas = objetos['vendas']
    var dados = {}
    
    for (let venda of vendas) {

      var produto = venda['produto']
      if(dados[produto] == null)
      {
        dados[produto] =  0
      }
      dados[produto] += venda['quantidade'];
    }
    var keys = Object.keys(dados).sort();
    
    var dado = []
    for (let key of keys) {
      this.barChartLabels.push(key);
      dado.push(dados[key]);
    }

    this.barChartData = [{data: dado, label: 'Vendas'}];
  }
  getter()
  { 
    this.service.getVendas().subscribe(data => {
      this.montar_grafico(data);
    }, (error: any) => {
        this.erro = error;
        console.log('ERROR', error);            
    }); 
  }
}
