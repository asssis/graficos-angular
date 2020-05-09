import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartVendaProdutoComponent } from './chart-venda-produto/chart-venda-produto.component';
import { ChartVendaMensalComponent } from './chart-venda-mensal/chart-venda-mensal.component';
import { TabelaVendasComponent } from './tabela-vendas/tabela-vendas.component';
import { ChartVendaAcumuladosComponent } from './chart-venda-acumulados/chart-venda-acumulados.component';

const routes: Routes = [
  {path: 'venda-produto', component: ChartVendaProdutoComponent},
  {path: 'venda-mensal', component: ChartVendaMensalComponent},
  {path: 'venda-tabela', component: TabelaVendasComponent},
  {path: 'venda-acumulada', component: ChartVendaAcumuladosComponent}
];
ChartVendaAcumuladosComponent
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
