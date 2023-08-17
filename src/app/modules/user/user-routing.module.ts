import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CategoriesResolver } from 'src/app/core/resolvers/categories.resolver';
import { ProductViewComponent } from 'src/app/components/product-view/product-view.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    resolve: { categories: CategoriesResolver },
  },
  {
    path: ':id',
    component: ProductViewComponent,
    data: {
      isShowingActions: false,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
