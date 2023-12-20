import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { protectedResources } from './endpoints';
import { Item } from './types';
import { catchError, Observable, retry, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private httpClient: HttpClient) { }

  getItem(id: number): Observable<Item> {
    const endpoint: string = protectedResources.APIsimple.endpointItems + '/' + id;
    return this.httpClient.get<Item>(endpoint).pipe(catchError(this.errorHandler));
  }

  getAllItems(searchString: string): Observable<Array<Item>> {
    var params = new HttpParams().set("searchFor", searchString);
    return this.httpClient.get<Array<Item>>(protectedResources.APIsimple.endpointItems, { params }).pipe(retry(2), catchError(this.errorHandler));
  }

  addItem(itemInAForm: FormData): Observable<Item> {
    return this.httpClient.post<Item>(protectedResources.APIsimple.endpointItems, itemInAForm).pipe(retry(2), catchError(this.errorHandler));;
  }

  private errorHandler(error: HttpErrorResponse) {
    let msg: string = "";
    let clientType: string = error.status === 0 ? "client-side" : "server-side, status:  " + error.status;

    let instruction: string = error.status !== 0 ? 'Please try again in a few seconds.  ' : "";

    msg = "Unable to process your Item request. " + error.error.title + "  " + error.error.detail + " Status: \n" + error.status + "  " + instruction;

    console.log(msg);

    return throwError(() => new Error(msg));
  }

}
