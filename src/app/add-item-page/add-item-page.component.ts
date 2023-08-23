import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, switchMap } from 'rxjs';

import { Events, ImageAddedEvent, FileUploadWithPreview, Images } from 'file-upload-with-preview';
import { Item, Image, ItemAndImages, Category } from '../types';

import { CategoryService } from '../category.service';
import { ItemService } from '../item.service';
import { ImageService } from '../images.service';
//import { FilehandlerService } from '../filehandler.service';
//import { ItemAndImageHandlerService } from '../item-and-image-handler.service';


@Component({
  selector: 'app-add-item-page',
  templateUrl: './add-item-page.component.html',
  styleUrls: ['./add-item-page.component.css', '../../../node_modules/file-upload-with-preview/dist/style.css']
})

export class AddItemPageComponent implements OnInit {

  form: FormGroup = {} as FormGroup;
  id: number = 0;  // always send a 0 for id when posting.
  upload: FileUploadWithPreview | undefined;
  numOfFilesUploaded: number = 0;

  returnedItem: Item = {} as Item;
  received_returnedItem: Boolean = false;
  // decided not to return images, but rather Item instead.
  // returnedImages: Array<Image> = [];

  // allCategories: Array<Category> = [];
  allCategories: Category[] = [];

  ngOnInit() {
    // get the list of categories
    this.categoryService.getCategories().subscribe((categories: Category[]) => { this.allCategories = categories; });

    this.upload = new FileUploadWithPreview('my-unique-id', { 'multiple': true });
    this.form = new FormGroup({
      id: new FormControl(0),
      // 2nd arguments is control validation which can take an array.
      // Here we specify that the name control is required,
      // and must contain alpha- numeric and word boundary chars between 3 - 10 characters long
      // regular expression \w = all alpha-numeric chars.  For some reason you need an additional \
      // \\w to make it work in angular. Same goes for space = \s. Need \\s
      // ('^[\w\s]{3,10}$') also '^[a-zA-Z0-9\\s]{3,10}$'
      name: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[\\w\\s]{3,20}$')])),
      categoryId: new FormControl('', Validators.required),
      description: new FormControl('', Validators.pattern('^[\\w\\s.%,]{0,50}$') ), // 
      estimatedValue: new FormControl('', Validators.pattern('[0-9]{0,4}')),
      imageDirectory: new FormControl("images", Validators.pattern('^[a-zA-Z]{4,10}$')) // 
    });
  }

  constructor(private itemService: ItemService,
    private categoryService: CategoryService,
    private imageService: ImageService) {
  }

  onSubmit(form: FormGroup) {

    console.log(form);

    // MLS 6/14/23 Create FormData object for item data and images
    // FormData is required because it creates a "multipart http request" which is needed for the RESTFul API back end to collect item.
    var itemData = this.packItem();

    // MLS ToDo: Send item in outer observable since it executes first.
    // When the itemService returns the item,
    // the inner Observable executes, using the itemId from the outer observeable
    var observableItemResult$: Observable<Item> = this.itemService.addItem(itemData).pipe(switchMap(
      (returnedItem) => {
      var imageData = this.packImages(returnedItem.id);
        return this.imageService.addImages(imageData, returnedItem.id);
      }));

    // Begin Execution of the observables by calling subscribe...once addItem returns the itemData, the Unary Function within switchMap will run,
    // calling packImages and addImages
    observableItemResult$.subscribe((item: Item) =>
    {
      this.returnedItem = item;
      this.received_returnedItem = true;
    });

  }

  packItem(): FormData {
    var itemData = new FormData();

    // MLS 6/20/23 Get data out of FormGroup and append to FormData
    itemData.append("id", this.id.toString());
    itemData.append("name", this.name());
    itemData.append("categoryId", this.categoryId().toString());
    itemData.append("description", this.description());
    itemData.append("estimatedValue", this.estimatedValue().toString());
    itemData.append("imageDirectory", this.imageDirectory());

    let primaryImage: File;
    if (((this.upload as FileUploadWithPreview).cachedFileArray).length > 0) {
      primaryImage = (this.upload as FileUploadWithPreview).cachedFileArray[0];
      itemData.append("imageName", primaryImage.name.substring(0, primaryImage.name.indexOf(":")));
      itemData.append("image", primaryImage, primaryImage.name.substring(0, primaryImage.name.indexOf(":")));
    }

    return itemData;
  }

  packImages(itemId: number): FormData {

    var imageData = new FormData();
    
    let fileToUpload: File;
    let fileName: string;
    let i: number = 0;
    let k: number = 0;

    if (((this.upload as FileUploadWithPreview).cachedFileArray).length > 1) {
      for (let file of (this.upload as FileUploadWithPreview).cachedFileArray) {
        if (i > 0) {
          k = i - 1;
          fileToUpload = file;
          fileName = fileToUpload.name.substring(0, fileToUpload.name.indexOf(":"));
          console.log(fileName);
          //imageData.append("id[" + k +"]", this.id.toString());
          //imageData.append("itemId[" + k +"]", itemId.toString());
          //imageData.append("imageNameB64[" + k +"]", fileName);
          imageData.append("images", fileToUpload, fileName);
          i += 1;
        }
        else i += 1;
      }
    }
    return imageData;
  }

  name(): string {
    let val: string = this.form.get("name")?.value;
    console.log(val);
    return val;
  }

  categoryId(): number {
    let val: number = this.form.get("categoryId")?.value;
    console.log(val);
    return val;
  }

  description(): string {
    let val: string = this.form.get("description")?.value;
    console.log(val);
    return val;
  }

  // Functions to get values out of FormGroup
  estimatedValue(): number {
    let val: number = this.form.get("estimatedValue")?.value;
    console.log(val);
    return val;
  }

  imageDirectory(): string {
    let val: string = this.form.get("imageDirectory")?.value;
    console.log(val);
    return val;
  }

}
