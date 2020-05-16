import { CategoriesService } from './../../providers/categories.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
export interface PeriodicElement {
  position: Number
  categoryName: string;
  menu: string;
  items: string;
}


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {
   ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['title', 'menu', 'items'];
  dataSource ;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      data => {
          this.dataSource =  new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
      }
    );
  }
}
