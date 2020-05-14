import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/providers/categories.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  category={title:''}
  constructor(private categoryService: CategoriesService,private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.category);
    this.categoryService.addCategory(this.category).subscribe(
      data =>{
      console.log(data)
      this.router.navigate(['/manager/categories'])
    }
    )

  }
  selected(event)
  {
    console.log("az")
  }


}
