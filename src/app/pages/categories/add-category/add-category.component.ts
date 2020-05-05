import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  selectable: boolean = true;
  removable: boolean = true;
  menus=[{id:1,name:"menu 1"},{id:2,name:"menu 2"}];
  category={name:'',menu:''}
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.category);
    
  }


}
