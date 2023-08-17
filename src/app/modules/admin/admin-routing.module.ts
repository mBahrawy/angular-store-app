import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductViewComponent } from 'src/app/components/product-view/product-view.component';
import { CategoriesResolver } from 'src/app/core/resolvers/categories.resolver';
import { ProductFormComponent } from './product-form/product-form.component';

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
    path: 'new',
    component: ProductFormComponent,
    resolve: { categories: CategoriesResolver },
  },
  {
    path: ':id',
    component: ProductViewComponent,
    data: {
      isShowingActions: true,
    }
  },
  {
    path: ':id/edit',
    component: ProductFormComponent,
    resolve: { categories: CategoriesResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
