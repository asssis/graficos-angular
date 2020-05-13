import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 

import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ChartVendaMensalComponent } from './chart-venda-mensal/chart-venda-mensal.component';
import { ChartVendaProdutoComponent } from './chart-venda-produto/chart-venda-produto.component';
import { TabelaVendasComponent } from './tabela-vendas/tabela-vendas.component';
import { ChartVendaAcumuladosComponent } from './chart-venda-acumulados/chart-venda-acumulados.component';
import { FazerVendaComponent } from './fazer-venda/fazer-venda.component';
import { FormsModule } from '@angular/forms';
import { ChartSalesProjectionComponent } from './chart-sales-projection/chart-sales-projection.component'
@NgModule({
  declarations: [
    AppComponent,
    ChartVendaMensalComponent,
    ChartVendaProdutoComponent,
    TabelaVendasComponent,
    ChartVendaAcumuladosComponent,
    FazerVendaComponent,
    ChartSalesProjectionComponent
 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    FormsModule,
    HttpClientModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
