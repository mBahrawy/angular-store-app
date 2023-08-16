import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpService) {}

  index(): Observable<Category[]> {
    return this.http.getRequest<Category[]>('products/categories');
  }
}
