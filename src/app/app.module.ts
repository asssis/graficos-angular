import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ChartVendaMensalComponent } from './chart-venda-mensal/chart-venda-mensal.component';
import { ChartVendaProdutoComponent } from './chart-venda-produto/chart-venda-produto.component';
import { TabelaVendasComponent } from './tabela-vendas/tabela-vendas.component';
@NgModule({
  declarations: [
    AppComponent,
    ChartVendaMensalComponent,
    ChartVendaProdutoComponent,
    TabelaVendasComponent
 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
