import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { regex } from 'src/app/core/helpers/regex';
import { Category } from 'src/app/core/interfaces/category';
import { Product, ProductFormData } from 'src/app/core/interfaces/product';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductsService } from 'src/app/core/services/products.service';

type FormType = 'create' | 'edit';

@Component({
  selector: 'app-create-product',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  productData!: Product;
  formType: FormType = 'create';
  imageURL!: string;
  categoriesList!: Category[];
  validImageUrl: boolean = true;

  handleImageError() {
    this.validImageUrl = false;
  }

  onImageUrlChange() {
    this.validImageUrl = true;
  }

  constructor(
    private formBuilder: FormBuilder,
    private products: ProductsService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  handleBack() {
    this.location.back();
  }

  buildForm(productFormData?: ProductFormData) {
    if (!productFormData) {
      productFormData = {
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
      };
    }

    this.productForm = this.formBuilder.group({
      title: [productFormData.title, [Validators.required]],
      price: [productFormData.price, [Validators.required, Validators.min(0), Validators.pattern(regex.productPrice)]],
      description: [productFormData.description, [Validators.required, Validators.minLength(5), Validators.maxLength(300)]],
      category: [productFormData.category, [Validators.required]],
      image: [productFormData.image, [Validators.required, Validators.pattern(regex.imageUrl)]],
    });
  }

  getProduct(productId: string) {
    this.products.single(productId).subscribe((res) => {
      this.productData = res;
      this.buildForm({
        title: res.title,
        price: res.price,
        description: res.description,
        category: res.category,
        image: res.image,
      });
      this.imageURL = res.image;
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      Object.keys(this.productForm.controls).forEach((field) => {
        const control = this.productForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return;
    }

    this.formType === 'create' &&
      this.products.new(this.productForm.value).subscribe(() => {
        this.auth.redirectUser();
      });

    this.formType === 'edit' &&
      this.products.edit(this.productData.id, this.productForm.value).subscribe(() => {
        this.auth.redirectUser();
      });
  }



  ngOnInit(): void {
    const productId = this.route.snapshot?.paramMap?.get('id');
    this.categoriesList = this.route.snapshot.data['categories']; // Access resolved categories

    // In case if there is a user ID, this view will act as edit form
    if (productId) {
      this.formType = 'edit';
      this.getProduct(productId);
      return;
    }

    // Otherwise, this view will act as create form
    this.formType = 'create';
    this.buildForm();
  }

}
