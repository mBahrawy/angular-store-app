import { NgModule } from '@angular/core';
import { ProductsSidebarComponent } from 'src/app/components/products-sidebar/products-sidebar.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products/products.component';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [
    ProductsComponent,
    ProductsSidebarComponent,
  ],
  imports: [
    MaterialModule,
    SharedModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
