import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../types';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-show-all-page',
  templateUrl: './show-all-page.component.html',
  styleUrls: ['./show-all-page.component.css']
})

export class ShowAllPageComponent implements OnInit {

  searchFor: string = "";
  myItems: Array<Item> = [];

  // MLS 12/11/23 perform error handling
  isHttpError: Boolean = false;
  httpError: string = "";

  // MLS 12/21/23 show message to user because it takes a while to get items and images
  isMessage: Boolean = false;
  message: string = "Processing your request...Hold please...";

  constructor(private itemService: ItemService,
    private router: Router,
    private activeRoute: ActivatedRoute) { };

  ngOnInit() {

    // determine if searchString is being used...
    //this.activeRoute.queryParamMap.subscribe(
    //  (params: ParamMap) => {
    //    this.searchFor = (params.get("searchFor")) as string;
    //  }
    //);

    this.isMessage  = true;

    var observableSearchResult$ = this.activeRoute.queryParamMap.pipe(switchMap(
      (params: ParamMap) => {
        this.searchFor = (params.get("searchFor")) as string;
        if (this.searchFor === null) this.searchFor = ""; // it will send a string = "null", rather than a null value.
        return this.itemService.getAllItems(this.searchFor);
      }
    ));

    observableSearchResult$.subscribe(
      {
        next: (items: Array<Item>) => { this.myItems = items; this.isMessage = false; },
        error: err => {
          this.isMessage = false;
          this.isHttpError = true;
          this.httpError = err.message + "  .  Unable to get list of items from Web Server.";
          console.log(err.message);
        }
      });
    // this.itemService.getAllItems().subscribe((items: Array<Item>) => { this.myItems = items; });
  }

  showItemDetail(item: Item) {
    this.router.navigate(['/showItem/' + item.id], {
      queryParams: {
        name: item.name,
        description: item.description,
        category: item.categoryId,
        estimatedValue: item.estimatedValue,
        imageDirectory: item.imageDirectory,
        imageName: item.imageName
      }
    });
  }

}
