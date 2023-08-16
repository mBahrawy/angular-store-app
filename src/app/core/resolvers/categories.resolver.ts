import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriesService } from '../services/categories.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesResolver implements Resolve<Observable<string[]>> {

  constructor(private categories: CategoriesService) {}

  resolve(): Observable<string[]> {
    return this.categories.index();
  }
}
