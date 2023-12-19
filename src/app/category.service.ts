import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { protectedResources } from './endpoints';
import { Category } from './types';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Array<Category>> {
    return this.httpClient.get<Array<Category>>(protectedResources.APIsimple.endpointCategories).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse) {
    let msg: string = "";
    let clientType: string = error.status === 0 ? "client-side" : "server-side, status:  " + error.status;
    let instruction: string = error.status === 0 ? 'Please try again in a few seconds' : "";

    msg = instruction + "Unable to get list of categories from web service. " + error.message + ",  Status: " + error.status + "  " + error.statusText; 
    console.log(msg);

    return throwError(() => new Error(msg));
  }
}
