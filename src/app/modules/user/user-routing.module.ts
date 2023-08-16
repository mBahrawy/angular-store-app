import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CategoriesResolver } from 'src/app/core/resolvers/categories.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    resolve: { categories: CategoriesResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
