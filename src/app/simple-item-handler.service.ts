import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { protectedAPIs } from './config';
import { Simple } from './types';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SimpleItemHandlerService {

  constructor(private httpClient: HttpClient) { }

  addSimpleItem(formData: FormData): Observable<Simple> {
    return this.httpClient.post<Simple>(protectedAPIs.SimpleItemAPI.endpoint, formData);
  }
}
