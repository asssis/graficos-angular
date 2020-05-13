import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartSalesProjectionComponent } from './chart-sales-projection/chart-sales-projection.component';


const routes: Routes = [
  {path: 'chart-sales', component: ChartSalesProjectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
