import { NgModule } from '@angular/core';
import { ProductsSidebarComponent } from 'src/app/components/products-sidebar/products-sidebar.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products/products.component';
import { UserRoutingModule } from './user-routing.module';

import { HttpBackend, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';


@NgModule({
  declarations: [ProductsComponent, ProductsSidebarComponent],
  imports: [
    MaterialModule,
    SharedModule,
    UserRoutingModule,
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
export class UserModule {}
