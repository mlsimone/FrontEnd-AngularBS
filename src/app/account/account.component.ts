import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ms_graph_endpoint } from '../auth-config';
import { Profile } from '../types';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{
  userProfile: Profile = {};

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getProfile().subscribe((profile: Profile) => { this.userProfile = profile });
  }

  getProfile(): Observable<Profile> {
    return this.httpClient.get<Profile>(ms_graph_endpoint);
  }


}
