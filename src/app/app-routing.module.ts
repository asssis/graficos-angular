import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartVendaProdutoComponent } from './chart-venda-produto/chart-venda-produto.component';
import { ChartVendaMensalComponent } from './chart-venda-mensal/chart-venda-mensal.component';
import { TabelaVendasComponent } from './tabela-vendas/tabela-vendas.component';

const routes: Routes = [
  {path: 'venda-produto', component: ChartVendaProdutoComponent},
  {path: 'venda-mensal', component: ChartVendaMensalComponent},
  {path: 'venda-tabela', component: TabelaVendasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
