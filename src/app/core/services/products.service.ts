import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { DeleteProductModalComponent } from 'src/app/components/ui/delete-product-modal/delete-product-modal.component';
import { Product, ProductFormData } from '../interfaces/product';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private http: HttpService,
    private dialog: MatDialog,
    private toaster: ToastrService,
  ) {}

  openDeleteModal(productId: number, callback: () => void): void {
    const dialogRef = this.dialog.open(DeleteProductModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      result && this.destroy(productId).subscribe(callback);
    });
  }

  index(): Observable<Product[]> {
    return this.http.getRequest<Product[]>('products');
  }

  new(product: ProductFormData): Observable<Product> {
    return this.http.postRequest<Product>(`products`, product).pipe(tap(() => this.toaster.success('Product created successfully')));
  }

  edit(id: number, product: ProductFormData): Observable<Product> {
    return this.http.putRequest<Product>(`products/${id}`, product).pipe(tap(() => this.toaster.success('Product edited successfully')));
  }


  single(id: string): Observable<Product> {
    return this.http.getRequest<Product>(`products/${id}`);
  }

  destroy(id: number): Observable<Product> {
    return this.http.deleteRequest<Product>(`products/${id}`).pipe(tap(() => this.toaster.success('Product deleted successfully')));;
  }
}
