import { Component, OnInit } from '@angular/core';
import { VendasService } from '../services/vendasservice.service';

@Component({
  selector: 'app-chart-venda-acumulados',
  templateUrl: './chart-venda-acumulados.component.html',
  styleUrls: ['./chart-venda-acumulados.component.css']
})
export class ChartVendaAcumuladosComponent implements OnInit {
    public barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };
  
    public barChartLabels = [];
    public barChartType = 'line';
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
      var objetivos =  objetos['objetivos']
      var total_vendas = 0;
      var total_objetivo = 0;
      
      for (let venda of vendas) {
        total_vendas += parseFloat( venda['quantidade'] )* parseFloat(venda['valor_unico']);
      }
      for (let objetivo of objetivos) {
        total_objetivo += parseFloat(objetivo['valor']);
      }
      var total_projecao = total_objetivo - total_vendas;

      this.barChartLabels = ['VENDAS','TENDENCIA','META'];
      this.barChartData = [
        {data: [total_vendas, total_projecao, total_objetivo], label: 'ACUMULADO'}
    ];
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
  