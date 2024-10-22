import { Component, OnInit } from '@angular/core';
import { AlbumService } from './album.service';
import { Album } from '../models/album.model';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css'
})
export class AlbumComponent implements OnInit {
  albumList: Album[] = [];

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albumService.GetAlbums().subscribe(albumList => {
      this.albumList = albumList;
      console.log(albumList);
    } );
  }

}
