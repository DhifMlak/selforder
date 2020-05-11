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
  displayedColumns: string[] = ['categoryName', 'menu', 'items'];
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
        data.forEach(element => {
          console.log(element._id)
          this.ELEMENT_DATA.push({position:element._id,categoryName:element.title,menu:'menu',items:element.items.title})
          console.log(this.ELEMENT_DATA)
          this.dataSource =  new MatTableDataSource(this.ELEMENT_DATA);
          console.log(this.dataSource)
        });
      }
      

    )
    
    this.dataSource.sort = this.sort;
  }

}
