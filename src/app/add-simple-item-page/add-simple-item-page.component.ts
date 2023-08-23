import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Category, Simple } from '../types';
import { Observable } from 'rxjs';

import { CategoryService } from '../category.service';
import { SimpleItemHandlerService } from '../simple-item-handler.service';

@Component({
  selector: 'app-add-simple-item-page',
  templateUrl: './add-simple-item-page.component.html',
  styleUrls: ['./add-simple-item-page.component.css']
})
export class AddSimpleItemPageComponent implements OnInit{

  id: number = 0;
  categories!: Category[];
  form: FormGroup = {} as FormGroup;

  returnedItem!: Simple;


  constructor(private categoryService: CategoryService, private simpleItemHandlerService: SimpleItemHandlerService) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((cats: Category[]) => { this.categories = cats; });
    this.form = new FormGroup({
      id: new FormControl(0),
      name: new FormControl(''),
      categoryId: new FormControl(''),

    });

  }

  onSubmit(form: FormGroup) {

    console.log(form);

    // MLS 6/14/23 Create FormData object for item data and images
    // this creates a multipart message which is required for back end to collect both item and image data
    var itemData = new FormData();

    // MLS 6/20/23 Get data out of FormGroup and append to FormData
    itemData.append("id", this.id.toString());
    itemData.append("name", this.name());
    itemData.append("categoryId", this.categoryId());

    this.simpleItemHandlerService.addSimpleItem(itemData).subscribe((item: Simple) => { this.returnedItem = item; });
  }

  name(): string {
    let val: string = this.form.get("name")?.value;
    console.log(val);
    return val;
  }

  categoryId(): string {
    let val: string = this.form.get("categoryId")?.value;
    console.log(val);
    return val;
  }

  category(val:number): Category {
    console.log(val);
    return this.categories[val-1];
  }

}
