import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductsTableComponent } from './products-table/products-table.component';

@NgModule({
  declarations: [
    ProductsTableComponent
  ],
  imports: [
    AdminRoutingModule,
    CommonModule
  ]
})
export class AdminModule { }
