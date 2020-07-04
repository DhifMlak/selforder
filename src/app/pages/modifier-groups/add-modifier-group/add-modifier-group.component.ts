import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ItemsService } from '../../../providers/items.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-modifier-group',
  templateUrl: './add-modifier-group.component.html',
  styleUrls: ['./add-modifier-group.component.css']
})
export class AddModifierGroupComponent implements OnInit {
  myControl = new FormControl();
  options$: Observable<Array<any>>;
  group = { title: '', modifier_options: { types: '' }, quantity_info: { quantity: { max_permitted: 0, min_permitted: 0 } } };
  type1 = false;
  type2 = true;
  selectedMG;
  selectedMGs = [];
  disabled = true;
  constructor(private itemService: ItemsService) { }

  async ngOnInit() {
    this.options$ = await this.itemService.getItems();
  }
  displayFn(option): string {
    return option && option.title ? option.title : '';
  }

  async selected(e) {
    console.log(e.option.value);
    this.selectedMG = e.option.value;
    this.disabled = false;
  }

  async add() {
    this.selectedMGs.push(this.selectedMG);
    this.selectedMG = null;
    this.disabled = true;
  }

  remove(mg) {
    this.selectedMGs = this.selectedMGs.filter(elem => elem !== mg);
    console.log(mg);
  }
  onSubmit() { }
}
