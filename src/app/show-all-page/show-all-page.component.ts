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

    var observableSearchResult$ = this.activeRoute.queryParamMap.pipe(switchMap(
      (params: ParamMap) => {
        this.searchFor = (params.get("searchFor")) as string;
        if (this.searchFor === null) this.searchFor = ""; // it will send a string = "null", rather than a null value.
        return this.itemService.getAllItems(this.searchFor);
      }
    ));

    observableSearchResult$.subscribe(
      {
        next: (items: Array<Item>) => { this.myItems = items; },
        error: err => {
          this.isHttpError = true;
          this.httpError = err + "  .  Unable to get list of items from Web Server.";
          console.log(err);
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
