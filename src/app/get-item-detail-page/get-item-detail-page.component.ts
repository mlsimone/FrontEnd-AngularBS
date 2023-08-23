import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { protectedAPIs } from '../config';
import { Observable } from 'rxjs';
import { Item, Image } from '../types';
import { ImageService } from '../images.service';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';

@Component({
  selector: 'app-get-item-detail-page',
  templateUrl: './get-item-detail-page.component.html',
  styleUrls: ['./get-item-detail-page.component.css']
})
export class GetItemDetailPageComponent implements OnInit {

  selectedImage!: String;
  item: Item = {} as Item;
  ReturnedImages: Image[] = [];

  stringId: String = "";  // id: comes from the activatedRoute showItem/id
  id: number = -1;

  constructor(private imageService: ImageService,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {

    // get the id associated with the active Route
    this.stringId = this.activeRoute.snapshot.paramMap.get('id') as String;
    this.id = + this.stringId;  // does a type conversion to integer with the =+

    // get the item from the queryString..
    this.activeRoute.queryParamMap.subscribe(
      (params: ParamMap) =>
      {
        this.convertParamsToItem(params);

        // Now that I have converted the queryString Params to an item, I can set the main image
        this.selectedImage = this.item.imageName;
      } 
    );

    // this is where I call the service to get my images
    this.imageService.getImages(this.id, this.item.imageDirectory).subscribe(
      (returnedImages: Image[]) => {
        this.ReturnedImages = returnedImages;
        // the image is encoded in the imageName as a base64 string
        // according to references, it will display as is, so I only
        // need to set the <img src = item.imageName
      });



    // MLS 6/21/23
    // on the back end, the images are received by the RestFul API in a list:
    // public List<IFormFile> images { get; set; }
  }

  convertParamsToItem(params: ParamMap): void
  {
    // let item: Item;

    this.item.name = (params.get("name")) as string;
    this.item.description = (params.get("description")) as string;
    
    let stringEstimatedValue = (params.get("estimatedValue")) as string;
    this.item.estimatedValue = + stringEstimatedValue;
    let StringCatId = (params.get("categoryId")) as string;
    this.item.categoryId = + StringCatId;

    this.item.imageName = (params.get("imageName")) as string;
    this.item.imageDirectory = (params.get("imageDirectory")) as string;

  }
  CallMe(): void { }
}
