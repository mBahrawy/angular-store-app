import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Category } from 'src/app/core/interfaces/category';

@Component({
  selector: 'app-products-sidebar',
  templateUrl: './products-sidebar.component.html',
  styleUrls: ['./products-sidebar.component.scss'],
})
export class ProductsSidebarComponent implements OnInit {
  @Input() allCategories!: Category[];

  @Input() filteredCategories!: Category[];
  @Output() filteredCategoriesChange = new EventEmitter<Category[]>();

  @Input() isAllCategoriesChecked!: boolean;
  @Output() isAllCategoriesCheckedChange = new EventEmitter<boolean>();

  checkBoxcategories!: { name: string; checked: boolean }[];

  handleCheck() {
    this.filteredCategoriesChange.emit(
      this.checkBoxcategories
        .filter((category) => category.checked)
        .map((category) => category.name as Category)
    );

    const isAllItemSelected = this.areEqual(
      this.allCategories,
      this.checkBoxcategories
        .filter((category) => category.checked)
        .map((category) => category.name)
    );

    if (isAllItemSelected) {
      this.isAllCategoriesChecked = true;
    }
     else {
      this.isAllCategoriesChecked = false;
    }
  }

  areEqual(array1: unknown[], array2: unknown[]) {
    if (array1.length === array2.length) {
      return array1.every((element) => {
        if (array2.includes(element)) {
          return true;
        }

        return false;
      });
    }

    return false;
  }

  handleAllCheck() {
    if (this.isAllCategoriesChecked) {
      this.checkBoxcategories.forEach((category) => {
        category.checked = true;
      });
    } else {
      this.checkBoxcategories.forEach((category) => {
        category.checked = false;
      });
    }

    this.isAllCategoriesCheckedChange.emit(this.isAllCategoriesChecked);
  }

  ngOnInit(): void {
    if (this.isAllCategoriesChecked) {
      this.checkBoxcategories = this.allCategories.map((category) => {
        return {
          name: category,
          checked: true,
        };
      });
      return;
    }

    this.checkBoxcategories = this.allCategories.map((category) => {
      return {
        name: category,
        checked: this.filteredCategories.includes(category),
      };
    });
  }
}
