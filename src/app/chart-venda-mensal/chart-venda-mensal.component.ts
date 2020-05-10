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
      var venda_objetiva_acumulada = 0      
      var projecao_acumulada = 0;
      var ultimo_mes = 0;
      for(let x of objetivos_ordenado)
      {
        if( this.barChartLabels.indexOf(this.get_week(x.mes)) != -1){
          valor_projecao -= dados[x.mes]
          valor_acumulado += dados[x.mes];
          serie_venda_acumulada.push(valor_acumulado);   
          serie_vendas_realizadas.push(dados[x.mes]);
          projecao_acumulada += dados[x.mes];
          serie_venda_projecao.push(projecao_acumulada);
          ultimo_mes = parseInt(x.mes);
        }  
        venda_objetiva_acumulada += x.valor;
        dados_objetivos.push(venda_objetiva_acumulada);
        resto_periodo -= 1;
      }
      var media_vendas_realizadas = projecao_acumulada / serie_vendas_realizadas.length;
     

      for(var i = 0; i <= 1; i++){
        ultimo_mes += 1
        this.barChartLabels.push(this.get_week(ultimo_mes));   
        projecao_acumulada += media_vendas_realizadas;
        serie_venda_projecao.push(projecao_acumulada);
      }
     
      ultimo_mes += 1
      projecao_acumulada += media_vendas_realizadas;
      var ultimo = serie_venda_projecao.length;
      serie_venda_projecao.push(serie_venda_projecao[ultimo-1]);
      this.barChartLabels.push(this.get_week(ultimo_mes));  
  
      for(var i = 1; i <= 3; i++){
          ultimo_mes += 1
          var ultimo = serie_venda_projecao.length;
          var v1 = serie_venda_projecao[ultimo-1];
          var v2 = serie_venda_projecao[ultimo-3];

          serie_venda_projecao.push(v2 + v1);
          this.barChartLabels.push(this.get_week(ultimo_mes));  
      }
      this.barChartData = [
        {data: serie_venda_acumulada, label: 'Acumulado'},
        {data: dados_objetivos, label: 'Objetivo'},

        {data: serie_venda_projecao, label: 'Projeção'}
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
  