import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/core/interfaces/product';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit, OnDestroy {
  product!: Product;
  private productSub$: Subscription = new Subscription();

  constructor(
    private products: ProductsService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private location: Location
  ) {}

  handleBack() {
    this.location.back();
  }

  delete(): void {
    this.products.openDeleteModal(this.product.id, () => {
      this.auth.redirectUser();
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productSub$ = this.products.single(id).subscribe((product) => {
        this.product = product;
      });
    }
  }

  ngOnDestroy(): void {
    this.productSub$.unsubscribe();
  }
}
