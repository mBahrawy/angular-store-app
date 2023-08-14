import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsTableComponent } from './products-table/products-table.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
    import('./products-table/products-table.component').then(
      (m) => m.ProductsTableComponent
    ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
