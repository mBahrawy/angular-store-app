import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeAuthGuard } from './core/guards/de-auth.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [DeAuthGuard],
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./modules/products/products.module').then((m) => m.ProductsModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
