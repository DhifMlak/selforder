import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from './../items/items.component';
import { CategoriesService } from './../../providers/categories.service';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modifier-groups',
  templateUrl: './modifier-groups.component.html',
  styleUrls: ['./modifier-groups.component.css']
})
export class ModifierGroupsComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['Name', 'Note', 'Contains','Itemsusing'];
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
