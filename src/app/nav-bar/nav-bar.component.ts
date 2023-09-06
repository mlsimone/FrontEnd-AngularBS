import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, takeUntil, Subject, take } from 'rxjs';

import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EndSessionRequest, EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {

  SearchBoxForm: FormGroup = {} as FormGroup;
  activeUser: string | undefined = "unknown user";
  isAuthenticated: boolean = false;

  // When the NavBar closes, unsubscribe from the MSAL Observables
  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(private router: Router,
    private msalService: MsalService,
    private msalBroadCastService: MsalBroadcastService) { }

  ngOnInit(): void {
    this.SearchBoxForm = new FormGroup({
      searchBox: new FormControl('', Validators.pattern('^[\\w]{0,10}$'))
    });

    // subscribe to BroadCast Service
    // this is needed because authentication status can only be
    //  set when MSAL isn't busy
    this.msalBroadCastService.inProgress$
      .pipe(filter((busyStatus: InteractionStatus) => busyStatus === InteractionStatus.None),
        takeUntil(this.unsubscribe))
      .subscribe(() => {
        console.log("setting Authentication Status while MSAL is idle");
        this.setAuthenticationStatus();
      })

    // He would rather set the activeAccount upon LOGIN_SUCCESS event...so subscribe to that event.
    this.msalBroadCastService.msalSubject$
      .pipe(filter((message: EventMessage) => message.eventType === EventType.LOGIN_SUCCESS),
        takeUntil(this.unsubscribe))
      .subscribe((message: EventMessage) => {
        const authResult = message.payload as AuthenticationResult;
        this.msalService.instance.setActiveAccount(authResult.account);
        console.log("received LOGIN_SUCCESS");
      })

    // subscribe to a logout
    this.msalBroadCastService.msalSubject$
      .pipe(filter((message: EventMessage) => message.eventType === EventType.LOGOUT_SUCCESS),
        takeUntil(this.unsubscribe))
      .subscribe((message: EventMessage) => {
        const result = message.payload as EndSessionRequest;  // contains {account, and many other properties}
        this.isAuthenticated = false;
        console.log("received LOGOUT_SUCCESS");
      })
  }

  ngOnDestroy(): void {

    // emit an undefined event
    this.unsubscribe.next(undefined);
    this.unsubscribe.complete();

  }

  onSearchSubmit(form: FormGroup) {
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

  loginUsingPopup(): void {
    this.msalService.instance.loginPopup({
      scopes: ["User.Read"]
    });
  }

  loginUsingRedirect(): void {
    console.log("calling loginUsingRedirect");
    this.msalService.instance.loginRedirect({
      scopes: ["User.Read"]  // you need user.read to access Microsoft Graph Profile Endpoints (to display name)
    })
  }

  logout(): void {
    this.msalService.instance.logoutRedirect();
  }
  setAuthenticationStatus(): void {
    let activeAccount = this.msalService.instance.getActiveAccount();

    if (!activeAccount && this.msalService.instance.getAllAccounts.length > 0) {
      activeAccount = this.msalService.instance.getAllAccounts()[0];
      this.msalService.instance.setActiveAccount(activeAccount);
    }


    this.isAuthenticated = !!activeAccount;
    this.activeUser = activeAccount?.name;
      

  }

}
