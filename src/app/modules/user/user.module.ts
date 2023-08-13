import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ProductsComponent } from './products/products.component';



@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    UserRoutingModule,
    CommonModule
  ]
})
export class UserModule { }
