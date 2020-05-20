import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/providers/categories.service';
import { MenuService } from 'src/app/providers/menu.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  category = { title: '' };
  menus$: any;
  selectable = true;
  chipControl = new FormControl(new Set());

  constructor(private categoryService: CategoriesService, private router: Router,
    private menuService: MenuService) { }

  ngOnInit(): void {
    this.menus$ = this.menuService.getMenus();
  }
  toggleChip = (chip: any) => {
    const addChip = () => { this.chips.add(chip); };
    const removeChip = () => { this.chips.delete(chip); };

    this.chips.has(chip) ? removeChip() : addChip();
    console.log(this.chips);
  }
  get chips() {
    return this.chipControl.value;
  }

  onSubmit() {
    const category = { ...this.category, ...{ menus:  Array.from(this.chips) } };
       this.categoryService.addCategory(category).subscribe(
        data => {
          this.router.navigate(['/manager/categories']);
        }
      );
  }


}
