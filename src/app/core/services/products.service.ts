import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpService } from './http.service';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpService) {}

  index() {
    return this.http.getRequest<Product[]>("products");
  }
}
