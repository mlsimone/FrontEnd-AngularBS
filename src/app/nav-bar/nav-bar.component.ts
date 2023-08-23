import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  SearchBoxForm: FormGroup = {} as FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {
    this.SearchBoxForm = new FormGroup({
      searchBox: new FormControl('', Validators.pattern('^[\\w]{0,10}$'))
    });
  }

  onSubmit(form: FormGroup) {
    console.log(form);

    // MLS 8/22/23 revisit why this doesn't work...receive error that get is not a function...
    // let searchString: string = form.get("searchBox")?.value();  // get('searchBox')?.value;

    let searchString: string = "";
    searchString = this.search();
    console.log(searchString);

    // navigate to /showAll route and make searchString a querystring
    this.router.navigate(['/showAll'], {
      queryParams: {
        searchFor: searchString
      }
    });

  }

  search(): string {
    let val: string = this.SearchBoxForm.get("searchBox")?.value;
    console.log(val);
    return val;
  }

}
