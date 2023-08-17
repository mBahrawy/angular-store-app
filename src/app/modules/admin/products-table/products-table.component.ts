import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/core/interfaces/product';
import { ProductsService } from 'src/app/core/services/products.service';

import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = ['id', 'title', 'price', 'category', 'rating', 'image', 'actions'];
  dataSource!: MatTableDataSource<Product>;
  private productsSub$: Subscription = new Subscription();


  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private products: ProductsService) {}

  delete(productId: number): void {
    this.products.openDeleteModal(productId, () => {
      this.loadProducts()
    });
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Product>();
    this.dataSource.paginator = this.paginator;
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.productsSub$.unsubscribe();
  }

  loadProducts(): void {
    this.productsSub$ = this.products.index().subscribe(result => {
      this.dataSource.data = result;
      this.totalItems = result.length;
    });
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadProducts();
  }
}
