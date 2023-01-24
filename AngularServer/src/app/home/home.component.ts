import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // key:string;
  log: boolean;
  city_level: string;
  gzl_level: string;
  bc_level: string;
  cvr_white: string;
  manga_bc: string;
  anime_bc: string;
  gzl: string;

  constructor(public _storageService: StorageService) {

    this.log = false
    this.city_level = 'assets/images/godizlla level1.png'
    this.gzl_level = 'assets/images/godizlla level2.png'
    this.bc_level = 'assets/images/godzilla level3.png'
    this.cvr_white = 'assets/images/white-cover-home.png'
    this.manga_bc = './assets/images/manga-bc.png'
    this.anime_bc = './assets/images/anime-bc.png'
    this.gzl = ''


  }
  ngOnInit(): void {
    if (localStorage.getItem("id") === null) {
      this.log = false
      this.gzl = './assets/images/godzilla-reg.png'
    } else {
      this.log = true
      this.gzl = './assets/images/godzilla-error.png'
    }
  };
  admin(): boolean {
    var res = false;
    const id = this._storageService.getData('id');

    console.table(localStorage)
    console.log(id, id == '42')

    if (id == '42') {
      res = true;
    }
    return res;
  }

}