import { ItemsService } from './../../providers/items.service';
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


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
   ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['displayName', 'notes', 'price', 'menus', 'categories', 'ModifierGroups'];
  dataSource ;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private itemService:ItemsService) { }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(
      data => {
        data.forEach(element => {
          console.log(element._id)
          this.ELEMENT_DATA.push({ id: 1, displayName: element.title, notes: '', price: element.price_info.price, menus: '', categories: '', ModifierGroups: '' })
          console.log(this.ELEMENT_DATA)
          this.dataSource =  new MatTableDataSource(this.ELEMENT_DATA);
          console.log(this.dataSource)
        });
      }
      

    )
    this.dataSource.sort = this.sort;
  }


}
