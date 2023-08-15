import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DeleteProductModalComponent } from 'src/app/components/ui/delete-product-modal/delete-product-modal.component';
import { Product } from '../interfaces/product';
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
      result && this.destroy(productId).subscribe(() => {
        this.toaster.success('Product deleted successfully');
        callback();
      });
    });
  }

  index(): Observable<Product[]> {
    return this.http.getRequest<Product[]>('products');
  }

  single(id: string): Observable<Product> {
    return this.http.getRequest<Product>(`products/${id}`);
  }

  destroy(id: number): Observable<Product> {
    return this.http.deleteRequest<Product>(`products/${id}`);
  }
}
