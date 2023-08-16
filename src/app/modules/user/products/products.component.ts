import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
  private productsSub$: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private products: ProductsService
  ) {}

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
    this.filterdProductsList = [...this.productsList].filter((prod) => {
      return this.filteredCategories.some(
        (category) => category === prod.category
      );
    });
  }

  loadProducts(): void {
    this.productsSub$ = this.products.index().subscribe((result) => {
      this.productsList = result;
      this.handleApplyFilter();
      if (this.isAllCategoriesChecked)
        this.filterdProductsList = [...this.productsList];
    });
  }

  ngOnInit(): void {
    this.categoriesList = this.route.snapshot.data['categories']; // Access resolved categories
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.productsSub$.unsubscribe();
  }
}
