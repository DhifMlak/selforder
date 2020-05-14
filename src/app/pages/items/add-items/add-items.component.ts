import { Router } from '@angular/router';
import { CategoriesService } from './../../../providers/categories.service';
import { ItemsService } from './../../../providers/items.service';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { FormControl, Form } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})
export class AddItemsComponent implements OnInit {

  /** Declaration */
  item = { title: '', description: '', sellown: '', category: [], price_info: {price:''}, tax_info: {vat_rate_percentage:''}, outofstock: '' };
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  categoryCtrl = new FormControl();
  filteredCategory: Observable<string[]>;
  category: string[] = [];
  allCategories: string[] = [];
  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  files: any[] = [];

  /** End of declaration section */
  ngOnInit() {

  }

  constructor(private itemService:ItemsService,private categoryService:CategoriesService,private router: Router
    ) {
    this.categoryService.getCategories().subscribe(
      data => {
        data.forEach(element => {
          console.log(element._id)
          this.allCategories.push(element.title)
          
        });
      }
      

    )
    this.filteredCategory = this.categoryCtrl.valueChanges.pipe(
      startWith(null),
      map((cat: string | null) => cat ? this._filter(cat) : this.allCategories.slice()));
  }



  onSubmit() {
    this.itemService.addItem(this.item).subscribe(
      data => {console.log(data)
        this.router.navigate(['/manager/items'])

      }
    )
    console.log(this.item)
  }

  ChangeOutOfstock(event) {
    this.item.outofstock = event.checked;
  }
  getCat(v) {
    console.log(v)
    this.item.category = v;
  }
  OnchangeSellItem(event) {
    console.log(event.value)
    this.item.sellown = event.value;
  }

  /** Image Section */
  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  /** End of Image section */

  /** Category Section */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.category.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.categoryCtrl.setValue(null);
  }

  remove(cat: string): void {
    const index = this.category.indexOf(cat);

    if (index >= 0) {
      this.category.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log(event.option.viewValue)
    this.category.push(event.option.viewValue);
    this.item.category = this.category;

    console.log(this.category)
    console.log(this.item.category)

    this.categoryInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCategories.filter(cat => cat.toLowerCase().indexOf(filterValue) === 0);
  }
  /** End of category section */
}
