import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 @Injectable({
    providedIn: 'root'
 })

export class SalesService {
  constructor(private http: HttpClient) {}  
  sales: any;
  API = "http://34.95.209.145:4000/"

  getSales(startDate: string, periodType: string): any
  { 
    var formatDate = "";
    if(startDate != null)
    {
      formatDate = startDate.substring(8, 10);
      formatDate += "/";
      formatDate += startDate.substring(5, 7);
      formatDate += "/";
      formatDate += startDate.substring(0, 4);
    }
    else
    {
      formatDate = "";
    }
    return this.http.get<any>(`${this.API}sale/pesquisa?periodType=${periodType}&startDate=${formatDate}`);
  }
  public getSaless(startDate: string, periodType: string)
    {
      return this.Goal;
      if(periodType == 'monthly')
      {
      }     
      if(periodType)
      {
      }      
    }
    public Goal = {
          Amount: "500", 
          Start: "01/01/2020",
          End: "01/01/2021",
          PeriodType: "Monthly",
          History:[
            { 
              Value: "50", 
              Date: "01/02/2020"
            },
            { 
              Value: "50", 
              Date: "01/03/2020"
            },
            { 
              Value:"50", 
              Date: "01/04/2020"
            },
            { 
              Value:"50", 
              Date: "01/05/2020"
            },
            { 
              Value:"50", 
              Date: "01/06/2020"
            },
            { 
              Projection: true,
              Value: "0", 
              Date: "01/07/2020"
            },
            { 
              Projection: true,
              Value: "0",
              Date: "01/08/2020"
            },
            { 
              Projection: true,
              Value: "0",
              Date: "01/09/2020"
            },
            { 
              Projection: true,
              Value: "0",
              Date: "01/10/2020"
            },
            { 
              Projection: true,
              Value: "0",
              Date: "01/11/2020"
            },
            { 
              Projection: true,
              Value: "0",
              Date: "01/12/2020"
            }                                                
          ],
            
        };
}
