import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { protectedAPIs } from './config';
import { Item } from './types';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private httpClient: HttpClient) { }

  getItem(id: number): Observable<Item> {
    const endpoint: string = protectedAPIs.ItemAndImageAPI.endpoint + '/' + id;
    return this.httpClient.get<Item>(endpoint);
  }

  getAllItems(searchString: string): Observable<Array<Item>> {
    var params = new HttpParams().set("searchFor", searchString);
    return this.httpClient.get<Array<Item>>(protectedAPIs.ItemsAPI.endpoint, {params});
  }

  addItem(itemInAForm: FormData): Observable<Item> {
    return this.httpClient.post<Item>(protectedAPIs.ItemsAPI.endpoint, itemInAForm);
  }

}
