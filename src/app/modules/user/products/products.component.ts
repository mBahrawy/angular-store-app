import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { Category } from 'src/app/core/interfaces/category';
import { Product } from 'src/app/core/interfaces/product';
import { ProductsService } from 'src/app/core/services/products.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ scale: 0, opacity: 0 }),
        animate('0.4s ease-out', style({ scale: 1, opacity: 1 })),
      ]),
      transition(':leave', [
        style({ scale: 1, opacity: 1 }),
        animate('0.4s ease-in', style({ scale: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class ProductsComponent implements OnInit, OnDestroy {
  categoriesList!: Category[];
  filteredCategories: Category[] = [];
  isAllCategoriesChecked: boolean = true;
  productsList!: Product[];
  filterdProductsList: Product[] = [];
  searchedAndFilteredProductsList: Product[] = [];
  private productsSub$: Subscription = new Subscription();

  searchValue: string = '';
  searchValue$ = new Subject<string>();

  pageSize = 6;
  pageIndex = 0;
  totalItems = 0;

  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private products: ProductsService
  ) {}

  handleClearSearch() {
    this.searchValue$.next('');
    this.searchValue = '';
  }

  handleApplySearch(searchValue: string) {
    this.filterdProductsList = this.getFilteredProductsList().filter(
      (product) => {
        return product.title.toLowerCase().includes(searchValue.toLowerCase());
      }
    );
  }

  resetPagination(productsList: Product[]) {
    if (this.paginator) {
      this.paginator.pageIndex = 0;
      this.paginator.pageSize = 6;

      // Update the pagination data
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      const endIndex = startIndex + this.paginator.pageSize;
      this.filterdProductsList = productsList.slice(startIndex, endIndex);

      this.dataSource.data = this.filterdProductsList;
      this.paginator.length = productsList.length;
      this.totalItems = productsList.length;
    }
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;

    this.filterdProductsList = this.getFilteredProductsList().slice(
      startIndex,
      endIndex
    );

  }

  handleFilteredCategoriesChange($event: Category[]) {
    this.filteredCategories = $event;
    this.handleApplyFilter();
  }

  handleIsAllCategoriesCheckedChange($event: boolean) {
    this.isAllCategoriesChecked = $event;
    if ($event) {
      this.filterdProductsList = [...this.productsList];
      this.filteredCategories = [...this.categoriesList];
    } else {
      this.filterdProductsList = [];
      this.filteredCategories = [];
    }
  }

  handleApplyFilter() {
    this.filterdProductsList = this.getFilteredProductsList();
    this.resetPagination(this.filterdProductsList);
  }

  getFilteredProductsList(): Product[] {
    return [...this.productsList].filter((prod) => {
      return this.filteredCategories.some(
        (category) => category === prod.category
      );
    });
  }

  loadProducts(): void {
    this.productsSub$ = this.products.index().subscribe((result) => {
      this.productsList = result;
      if (this.isAllCategoriesChecked) {
        this.filterdProductsList = [...this.productsList];
      }

      // Configure pagination
      this.dataSource.data = this.filterdProductsList;
      this.totalItems = this.filterdProductsList.length;

      const startIndex = this.pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.filterdProductsList = this.productsList.slice(startIndex, endIndex);
    });
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Product>();
    this.dataSource.paginator = this.paginator;

    this.categoriesList = this.route.snapshot.data['categories']; // Access resolved categories

    if (this.isAllCategoriesChecked) {
      this.filteredCategories = [...this.categoriesList];
    }

    this.loadProducts();

    // Debounced product search setup
    this.searchValue$
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        this.handleApplySearch(value);
      });
  }

  ngOnDestroy(): void {
    this.productsSub$.unsubscribe();
  }
}
