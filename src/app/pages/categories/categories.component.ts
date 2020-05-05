import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
export interface PeriodicElement {
  position: Number
  categoryName: string;
  menu: string;
  items: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, categoryName: 'Burger', menu: 'menu', items: '-'},
  {position: 2, categoryName: 'Burger', menu: 'menu', items: '-'},
  {position: 3, categoryName: 'Burger', menu: 'menu', items: '-'},
  
];
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ['categoryName', 'menu', 'items'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor() { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }

}
