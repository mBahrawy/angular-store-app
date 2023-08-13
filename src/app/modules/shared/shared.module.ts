import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from 'src/app/components/ui/loader/loader.component';

@NgModule({
  declarations: [LoaderComponent],
  imports: [CommonModule, RouterModule, ],
  providers: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    LoaderComponent,
    HttpClientModule,
  ],
})
export class SharedModule {}
