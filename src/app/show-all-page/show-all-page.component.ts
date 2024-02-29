import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../types';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Observable, switchMap, timer, takeUntil } from 'rxjs';

@Component({
  selector: 'app-show-all-page',
  templateUrl: './show-all-page.component.html',
  styleUrls: ['./show-all-page.component.css']
})

export class ShowAllPageComponent implements OnInit {

  searchFor: string = "";
  myItems: Array<Item> = [];

  observableSearchResult$: Observable<Array<Item>> = this.activeRoute.queryParamMap.pipe(switchMap(
        (params: ParamMap) => {
          this.searchFor = (params.get("searchFor")) as string;
          if (this.searchFor === null) this.searchFor = ""; // it will send a string = "null", rather than a null value.
          return this.itemService.getAllItems(this.searchFor);
        }
      ));

  // MLS 12/11/23 perform error handling
  isHttpError: Boolean = false;
  httpError: string = "";

  // MLS 12/21/23 show message to user because it takes a while to get items and images
  isMessage: Boolean = false;
  message: string = "Processing your request...Hold please...";

  // MLS 2/29/24 Let the user know about database autopauses if it takes more than 3 seconds to get items. Continue to update
  // the user every second until the Array<Items> comes back from the database.
  // This design allows a user to know why the 1st request to "View Gallery" is slow. 
  isDatabaseMessage: Boolean = false;
  databaseMessage: string = "Azure database is resuming after being auto paused (saves $$), please be patient."
  observableUpdateDatabaseMessageEverySecond$: Observable<number> = timer(3000, 1000).pipe(takeUntil(this.observableSearchResult$));
  isReceivedItems: Boolean = false;

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

    this.observableSearchResult$.subscribe(
      {
        next: (items: Array<Item>) => { this.myItems = items; this.isReceivedItems = true;  this.isMessage = false; this.isDatabaseMessage = false; },
        error: err => {
          this.isMessage = true;
          this.message = "Please retry your request by clicking on 'View Gallery' again."
          this.isHttpError = true;
          this.httpError = err.message + "  .  Unable to get list of items from Web Server.";
          console.log(err.message);
        }
      });
    // this.itemService.getAllItems().subscribe((items: Array<Item>) => { this.myItems = items; });

    this.observableUpdateDatabaseMessageEverySecond$.subscribe(
      {
        next: (num: number) => {
          if (this.isReceivedItems === true || this.isHttpError === true) this.isDatabaseMessage = false;
          else {
            this.isDatabaseMessage = true;
            this.databaseMessage += ".";
          }
        },
        error: err => { }
      }
    );
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
