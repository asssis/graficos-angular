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
    get_week(mes): string
    {
      var month = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
      return month[parseInt(mes) - 1];
    }
    montar_grafico(objetos: any)
    {
      var vendas = objetos['vendas']
      var objetivos =  objetos['objetivos']
      var total_vendas = 0;
      var total_objetivo = 0;
      var venda_mes_valor = []

      for (let venda of vendas) {
        var mes = venda['mes'].toString().padStart(2, "0")
        if(venda_mes_valor[mes] == null)
        {
          venda_mes_valor[mes] =  0
        }
        venda_mes_valor[mes] += parseFloat(venda['quantidade']) * parseFloat(venda['valor_unico'].replace(',', '.'));
      }
      var objetivos_mes_valor = {}
      for (let objetivo of objetivos )
      {   
        if(objetivos_mes_valor[objetivo['mes']] == null)
        {
          objetivos_mes_valor[objetivo['mes']] =  0;
        }
        objetivos_mes_valor[objetivo['mes']] = objetivo['valor'];
      }
      var meses = Object.keys(venda_mes_valor).sort();
      var vendas_acumuladas = [];
      var campos_graficos = [];
      var valor_acumulado = 0;
      

      var valor_acumulado_objetivo = 0
      var seria_acumulada_objetivo = []
      
      for (let mes of meses )
      {
        valor_acumulado += venda_mes_valor[mes];
        vendas_acumuladas.push(valor_acumulado);
        valor_acumulado_objetivo += objetivos_mes_valor[mes];
        seria_acumulada_objetivo.push(valor_acumulado_objetivo);
        campos_graficos.push(this.get_week(mes));
      }
      for (let objetivo of objetivos)
      {
        var verifica = campos_graficos.indexOf(this.get_week(objetivo['mes']))
        if(verifica == -1)
        {
          campos_graficos.push(this.get_week(objetivo['mes']));
          valor_acumulado_objetivo += objetivo['valor'];
          seria_acumulada_objetivo.push(valor_acumulado_objetivo);
        }

      }
      this.barChartLabels = campos_graficos;
      this.barChartData = [
        {data: vendas_acumuladas, label: 'ACUMULADO'},
        {data: seria_acumulada_objetivo, label: 'OBJETIVO'}
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
  