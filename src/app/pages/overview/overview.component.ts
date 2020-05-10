import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { MenuService } from '../../providers/menu.service';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { MatSelect } from '@angular/material/select';
import { FormGroup, FormControl, Validators } from '@angular/forms';
interface OverviewNode {
  _id: string;
  title: string;
  items?: OverviewNode[];
}

/* const TREE_DATA: OverviewNode[] = [
  {
    title: 'Fruit',
    items: [
      { title: 'Apple' },
      { title: 'Banana' },
      { title: 'Fruit loops' },
    ]
  }, {
    title: 'burger',
    items: [
      {
        title: 'cheese burger',
        items: [
          { title: 'cheese' },
          { title: ' frites' },
        ]
      }, {
        title: 'chicken burger',
        items: [
          { title: 'chicken' },
          { title: 'frites' },
        ]
      },
    ]
  },
];
 */
/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  selectedMenu$: BehaviorSubject<any>;
  selectedItem: any;
  menus$: BehaviorSubject<Array<any>>;
  menuSubsciprion$;
  menuForm: FormGroup;
  private _transformer = (node: OverviewNode, level: number) => {
    return {
      id: node._id,
      expandable: !!node.items && node.items.length > 0,
      name: node.title,
      level: level,
    };
  }
  // tslint:disable-next-line:member-ordering
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);
  // tslint:disable-next-line:member-ordering
  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.items );
  // tslint:disable-next-line:member-ordering
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  // tslint:disable-next-line:member-ordering

  constructor(private menuService: MenuService) {
    this.menuForm = new FormGroup({
      menuId: new FormControl('', Validators.required),
    });
  }
  onMenuChange(event) {
    if (this.menuSubsciprion$) {
      this.menuSubsciprion$.unsubscribe();
    }
    this.menuSubsciprion$ = this.menuService.getMenuById(event.value).subscribe(data => {
      console.log(data);
      this.dataSource.data = data.items;
    });
  }
  ngOnInit(): void {
    this.menus$ =  this.menuService.getMenus();
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

}

