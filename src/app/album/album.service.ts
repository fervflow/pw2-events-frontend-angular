import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../models/album.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private _url: string = 'https://jsonplaceholder.typicode.com/albums';
  constructor(private httpClient: HttpClient) { }

  public GetAlbums(): Observable<Album[]> {
    return this.httpClient.get<Album[]>(this._url)
  }
}
