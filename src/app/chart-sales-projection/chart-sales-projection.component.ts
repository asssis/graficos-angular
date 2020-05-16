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
  constructor(private service: SalesService) {}
  ngOnInit(): void {
    this.getSalesServices(null, "monthly");
    this.Goal.PeriodType = "monthly";
  }
  
  onChange(): void {
    this.getDate();
    this.getSalesServices(this.Goal.Start, this.Goal.PeriodType);
  }
  public loadChart(goal: any)
  {
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
  public getSalesServices(startDate: string, periodType: string): any
  {   
    this.service.getSales(startDate, periodType).subscribe(data => {
      this.Goal = data;
      var dt = this.getDate();
      this.Goal.Start = `${dt.y}-${dt.m}-${dt.d}`;
      this.loadChart(data);            
      var dt = this.getDate();
      this.Goal.Start = `${dt.y}-${dt.m}-${dt.d}`;
      this.loadChart(data);            
    }, (error: any) => {
      console.log('ERROR', error);            
    });
  }
 public getDate()
 {
   var v = this.Goal.Start.indexOf('-');
   if(v == 4)
   {
  return {d: this.Goal.Start.substring(8, 10),
          m: this.Goal.Start.substring(5, 7),
          y: this.Goal.Start.substring(0, 4)}
  }
  else{

  return {d: this.Goal.Start.substring(0, 2),
    m: this.Goal.Start.substring(3, 5),
    y: this.Goal.Start.substring(6, 10)}
  }
 }
 
  public next_prev(event: string)
  {
    var dt = this.getDate();

    if(this.Goal.Start == null){
    }
    else if(this.Goal.PeriodType == "weekly"){
      dt.d = parseInt(dt.d) + parseInt(event) * 7;
    }   
    else if(this.Goal.PeriodType == "biweekly"){
      dt.d = parseInt(dt.d) + parseInt(event) * 14;
    }
    else if(this.Goal.PeriodType == "monthly"){
      dt.m = parseInt(dt.m) + parseInt(event);
    }
    else if(this.Goal.PeriodType == "quarterly"){
      dt.m = parseInt(dt.m) + (parseInt(event) * 3);
    }
    else if(this.Goal.PeriodType == "semiannual"){
      dt.m = parseInt(dt.m) + (parseInt(event) * 6);
    }
    else if(this.Goal.PeriodType == "yearly"){
      dt.m = parseInt(dt.m) + (parseInt(event) * 12);
    }
    if(dt.d > 28){
      dt.m = parseInt(dt.m) + 1;
      dt.d = 1;
    }else if(dt.d < 1){
      dt.m = parseInt(dt.m) - 1;
      dt.d = 28;
    }

    if(dt.m > 12){
      dt.y = parseInt(dt.y) + 1;
      dt.m = 1;
    }else if(dt.m < 1){
      dt.y = parseInt(dt.y) - 1;
      dt.m = 12;
    }
    dt.d = ("00" + dt.d).slice(-2);
    dt.m = ("00" + dt.m).slice(-2);
    this.Goal.Start = `${dt.y}-${dt.m}-${dt.d}`;
    this.getSalesServices(this.Goal.Start, this.Goal.PeriodType)
  }
}
