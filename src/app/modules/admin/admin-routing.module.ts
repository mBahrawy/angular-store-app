import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductViewComponent } from 'src/app/components/product-view/product-view.component';
import { ProductsTableComponent } from './products-table/products-table.component';

const routes: Routes = [
  {
    path: '',
    // component: ProductsTableComponent,
    loadComponent: () =>
    import('./products-table/products-table.component').then(
      (m) => m.ProductsTableComponent
    ),
  },
  {
    path: ':id',
    component: ProductViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
