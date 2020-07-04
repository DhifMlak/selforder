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
import { FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';

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
  sellown = true;
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  files: any[] = [];
  allCategories;
  public fields: Object = { text: 'title', value: '_id' };
  selectedCat;
  /** End of declaration section */
  ngOnInit() {

  }

  constructor(private itemService:ItemsService,private categoryService:CategoriesService,private router: Router
    ) {
    this.categoryService.getCategories().subscribe(
      data => {
        console.log(data)       
          this.allCategories = data ;  
      }
    )
    
    
  }



  onSubmit() {
    this.itemService.addItem(this.item).subscribe(
      data => {
        console.log(data)
        console.log(data[0]._id)
        this.categoryService.addItemCategory(data[0]._id,{idi:this.selectedCat._id}).subscribe();
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
    if(event.value === 'yes')
    {
      this.sellown = true;
    }
    else{
      this.sellown = false;
    }
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
  public onFiltering: EmitType<any> =  (e: FilteringEventArgs) => {
    let query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where("title", "startswith", e.text, true) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.allCategories, query);
  };
  SelectCatgorie($event)
  {
    this.selectedCat = $event.itemData ;
    console.log($event);
  }
}
