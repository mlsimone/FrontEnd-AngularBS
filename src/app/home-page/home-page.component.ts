import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../types';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  theseCategories: Array<Category> = [];

  constructor(private categoryService: CategoryService) { }

  // MLS 1/11/24 Wake up the database when the browser loads the home page.
  // The db autopauses after 1 hour of inactivity. Wake it up here, rather
  // than wait until the browser goes to the showall page, because we still
  // get database timeouts even with retry(2).
  ngOnInit() {

    this.categoryService.getCategories().subscribe({
      next: (categories: Array<Category>) => { this.theseCategories = categories; },
      error: (err: ErrorConstructor) => { console.log(err); }
    });

  }

}
