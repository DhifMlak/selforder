import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
export interface PeriodicElement {
  id: Number;
  displayName: string;
  notes: string;
  price: Number;
  menus: String;
  categories: String;
  ModifierGroups: String;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, displayName: 'Burger', notes: 'menu', price: 0, menus: '', categories: '', ModifierGroups: '' },
  { id: 1, displayName: 'Burger', notes: 'menu', price: 0, menus: '', categories: '', ModifierGroups: '' },
  { id: 1, displayName: 'Burger', notes: 'menu', price: 0, menus: '', categories: '', ModifierGroups: '' },
];
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  displayedColumns: string[] = ['displayName', 'notes', 'price', 'menus', 'categories', 'ModifierGroups'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor() { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }


}
