import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-modifier-group',
  templateUrl: './add-modifier-group.component.html',
  styleUrls: ['./add-modifier-group.component.css']
})
export class AddModifierGroupComponent implements OnInit {
  group = { title: '',  modifier_options: {types:''}, quantity_info: {quantity:{max_permitted:0 , min_permitted: 0 }} };
  type1 = false;
  type2= true;
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(){}
}
