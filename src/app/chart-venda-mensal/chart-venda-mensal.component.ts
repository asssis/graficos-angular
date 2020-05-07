import { Component, OnInit } from '@angular/core';
import { VendasService } from '../services/vendasservice.service'
import { Venda } from '../models/venda'

@Component({
  selector: 'app-chart-venda-mensal',
  templateUrl: './chart-venda-mensal.component.html',
  styleUrls: ['./chart-venda-mensal.component.css']
})
export class ChartVendaMensalComponent implements OnInit {
   
    public barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };
    public vendas: Venda;
  
    public barChartLabels = [];
    public barChartType = 'line';
    public barChartLegend = true;
    public barChartData = [];
    constructor(private service: VendasService) {  
      this.getter();
    }
  
    ngOnInit() {
    }
  
    get_week(mes): string
    {
      var month = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
      return month[parseInt(mes) - 1];
    }
    erro: any;
    montar_grafico(vendas: Venda[])
    {
      var dados = {}
      
      for (let venda of vendas) {
  
        var mes = venda['mes'].toString().padStart(2, "0")
        if(dados[mes] == null)
        {
          dados[mes] =  0
        }
        dados[mes] += parseFloat(venda['valor_unico'].replace(',', '.'));
      }
      var keys = Object.keys(dados).sort();
      
      var dado = []
      for (let key of keys) {
        this.barChartLabels.push(this.get_week(key));
        dado.push(dados[key]);
      }
  
      this.barChartData = [{data: dado, label: 'Vendas'}];
    }
    getter()
    {
      this.service.getVendas().subscribe((data: Venda[]) => {
        this.montar_grafico(data);
      }, (error: any) => {
          this.erro = error;
          console.log('ERROR', error);            
      }); 
    }
  }
  