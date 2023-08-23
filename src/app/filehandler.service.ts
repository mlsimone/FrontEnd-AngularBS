import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { protectedAPIs } from './config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilehandlerService {

  constructor(private httpClient: HttpClient) { }

  uploadFiles(formData: FormData): Observable<number> {
    return this.httpClient.post<number>(protectedAPIs.FileHandlerAPI.endpoint, formData);
  }
}
