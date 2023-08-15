import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from 'src/app/components/ui/loader/loader.component';
import { NavbarComponent } from 'src/app/components/ui/navbar/navbar.component';
import { NotFoundComponent } from 'src/app/components/views/not-found/not-found.component';
import { MaterialModule } from '../material/material.module';
import { ProductViewComponent } from 'src/app/components/product-view/product-view.component';
import { DeleteProductModalComponent } from 'src/app/components/ui/delete-product-modal/delete-product-modal.component';

const modules = [
  MaterialModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  HttpClientModule,
];

const componenets = [
  LoaderComponent,
  NavbarComponent,
  NotFoundComponent,
  ProductViewComponent,
  DeleteProductModalComponent,
];
@NgModule({
  declarations: [...componenets],
  imports: [modules],
  providers: [],
  exports: [...modules, ...componenets],
})
export class SharedModule {}
