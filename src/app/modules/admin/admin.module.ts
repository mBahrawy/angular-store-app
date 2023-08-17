import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductsTableComponent } from './products-table/products-table.component';
import { MatTableModule } from '@angular/material/table';
import { ProductFormComponent } from './product-form/product-form.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { HttpBackend, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';


// MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, CommonModule, RouterModule


@NgModule({
  declarations: [ProductFormComponent, ProductsTableComponent],
  imports: [
    MaterialModule,
    SharedModule,
    AdminRoutingModule,
    CommonModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend],
      },
    }),
  ],
})
export class AdminModule {}
