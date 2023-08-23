import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { protectedAPIs } from './config';
import { Observable } from 'rxjs';
import { Image, Item } from './types';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  // MLS 7/25/23 decided to return item instead of array<images>...
  // MLS 7/31/23 Attempted to send an array<FormData>, where each image was a FormData,
  // however, BackSide was unable to decipher message?
  // MLS 7/31/23 try sending arrays witin 1 FormData
  addImages(listOfImagesInForm: FormData, itemId: number): Observable<Item>// Observable<Array<Image>>
  {
    var params = new HttpParams().set("itemId", itemId);
    // client.get('/foo', options);
    // http.send the FormData which contains a List of images
    // return this.http.post<Array<Image>>(protectedAPIs.ImagesAPI.endpoint, listOfImagesInForm);
    // The itemId is obtained from URL by BackSide
    // MLS 7/25/23 Back end didn't let me send itemId in URL...Swagger didn't work
    // Modified to get itemId in QueryString as indicated below
    // return this.http.post<Item>(protectedAPIs.ImagesAPI.endpoint + '/' + itemId, listOfImagesInForm);
  
    return this.http.post<Item>(protectedAPIs.ImagesAPI.endpoint, listOfImagesInForm, {params});
  }

  getImages(itemId: number, imageDirectory: string): Observable<Array<Image>>
  {
    var params = new HttpParams().set("imageDirectory", imageDirectory);

    // var params = new HttpParams().set("itemId" , itemId);

    // http.get the List of Images
    // Back end didn't let me send itemId in QueryString...Swagger didn't work when I tried to get itemId from QueryString rather than URL
    // So had to modify to send itemId in URL instead as indicated below
    // return this.http.get<Array<Image>>(protectedAPIs.ImagesAPI.endpoint, { params });
    return this.http.get<Array<Image>>(protectedAPIs.ImagesAPI.endpoint + '/' + itemId, {params}); 
  }

}
