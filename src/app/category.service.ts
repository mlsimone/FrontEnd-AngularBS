import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { protectedAPIs } from './config';
import { Category } from './types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Array<Category>> {
    return this.httpClient.get<Array<Category>>(protectedAPIs.CategoryAPI.endpoint);
  }
}
