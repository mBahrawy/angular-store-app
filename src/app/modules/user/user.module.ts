import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ProductsComponent } from './products/products.component';
import { ProductsSidebarComponent } from 'src/app/components/products-sidebar/products-sidebar.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { TruncatePipe } from 'src/app/core/pipes/truncate.pipe';



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
