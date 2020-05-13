import { Component, OnInit } from '@angular/core';
import { SalesService } from '../services/sales.service';
@Component({
  selector: 'app-chart-sales-projection',
  templateUrl: './chart-sales-projection.component.html'
})

export class ChartSalesProjectionComponent implements OnInit {
  //chart attributes
  public barChartLabels = [];
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData = [];
  public barChartOptions = [];
  public Goal = {
    Amount: null,
    Start: null,
    End: null,
    PeriodType: null,
    History: []
  };
  constructor() {}
  ngOnInit(): void {
    this.Goal.PeriodType = "monthly";
    this.loadChart(null);
    this.loadChart(this.Goal);
  }
  
  onChange(): void {
    this.loadChart(this.Goal);
  }
  public loadChart(goal: any)
  {
    goal = this.getSalesServices(this.Goal.Start, this.Goal.PeriodType);
    var sales = goal.History;
    var arrayDates = sales.map(a => a.Date);
    var arrayGoal = [parseInt(goal.Amount) / sales.length];
    var arrayAmount = [parseInt(sales[0].Value)];
    var arrayProjection = [parseInt(sales[0].Value)];
    var average = parseInt(sales[0].Value);
    
    //processing chart data 
    for(var i = 1; i < sales.length; i++)
    {
      if(sales[i].Projection)
      {
        arrayProjection.push(arrayProjection[i-1] + average);
      }
      else
      {
        arrayAmount.push(arrayAmount[i-1] + parseInt(sales[i].Value));
        arrayProjection.push(arrayAmount[i-1] + parseInt(sales[i].Value));
        average = (average + parseInt(sales[i].Value)) / 2
      }
      arrayGoal.push((parseInt(goal.Amount) / sales.length) * (i+1)); 
    }
    
    //load in chart
    this.barChartData = [{data: arrayAmount, label: 'Sales'},
                         {data: arrayGoal, label: 'Goal'},
                         {data: arrayProjection, label: 'Projection'}];
    this.barChartLabels = arrayDates;
  }
  public getSalesServices(startDate: string, periodType: string)
  {   
    return <any>new SalesService().getSales(startDate, periodType);  
  }
  public getMonthYear(mes: number): string {
    var d = new Date();
    var m  = d.getMonth() + 1;
    var y = d.getFullYear();
    if(mes < 0){m  = d.getMonth() + 1;}
    else{y -= mes;}
    return [("00"+m).slice(-2), y].join('/');
  }
}
