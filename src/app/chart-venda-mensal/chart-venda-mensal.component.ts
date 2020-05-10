import { Component, OnInit } from '@angular/core';
import { VendasService } from '../services/vendasservice.service'
import { Venda } from '../models/venda'

@Component({
  selector: 'app-chart-venda-mensal',
  templateUrl: './chart-venda-mensal.component.html'
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
    montar_grafico(objetos: any)
    {
      if(objetos == null)
      {
        return
      }
      var vendas = objetos['vendas']
      var objetivos = objetos['objetivos']
      var dados = {}
      var valor_projecao = 0
      var serie_venda_projecao = [];
      for (let venda of vendas) {
        var mes = venda['mes'].toString().padStart(2, "0")
        if(dados[mes] == null)
        {
          dados[mes] =  0
        }
        dados[mes] += parseInt(venda['quantidade']) * parseFloat(venda['valor_unico'].replace(',', '.'));
      }
      for (let objetivo of objetivos)
      {
        valor_projecao += parseInt(objetivo['valor'])
      }
      var keys = Object.keys(dados).sort();
      
      var dado = []
      var serie_venda_acumulada = []
      for (let key of keys) {
        this.barChartLabels.push(this.get_week(key));
        dado.push(dados[key]);
      } 
      var dados_objetivos = []
      var objetivos_ordenado = objetivos.sort(function(a,b){ return a.mes - b.mes;});
      var valor_acumulado = 0;
      var total_objetivo_mes = 0
      var resto_periodo = objetivos_ordenado.length;
      var serie_vendas_realizadas = []
      for(let x of objetivos_ordenado)
      {
        if( this.barChartLabels.indexOf(this.get_week(x.mes)) != -1){
          valor_projecao -= dados[x.mes]
          valor_acumulado += dados[x.mes];
          serie_venda_acumulada.push(valor_acumulado);
         
         
          serie_vendas_realizadas.push(dados[x.mes]);
          serie_venda_projecao.push(dados[x.mes]);
        }
        else{
          this.barChartLabels.push(this.get_week(x.mes));
          var mes_projetado = valor_projecao / resto_periodo
          valor_projecao -= mes_projetado
          serie_venda_projecao.push(mes_projetado)                                
          serie_vendas_realizadas.push(0);
        }      
        dados_objetivos.push(x.valor);
        resto_periodo -= 1;
      }

      this.barChartData = [

        {data: serie_venda_projecao, label: 'Projeção'},
        {data: serie_venda_acumulada, label: 'Acumulado'},
        {data: serie_vendas_realizadas, label: 'Vendas'},
        {data: dados_objetivos, label: 'Objetivo'}
    ];
    }
    getter()
    {
      this.service.getVendas().subscribe(data => {
        if(data != null)
        {
        this.montar_grafico(data);
        }
      }, (error: any) => {
          this.erro = error;
          console.log('ERROR', error);            
      }); 

    }
  }
  