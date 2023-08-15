import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductsTableComponent } from './products-table/products-table.component';
import { MatTableModule } from '@angular/material/table';
import { ProductFormComponent } from './product-form/product-form.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductFormComponent
  ],
  imports: [
    MaterialModule,
    SharedModule,
    ProductsTableComponent,
    AdminRoutingModule,
    CommonModule
  ]
})
export class AdminModule { }
