import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  city_level: string;
  gzl_level: string;
  bc_level: string;
  cvr_white: string;
  manga_bc: string;
  anime_bc:string;
  gzl_r:string;
  gzl_e:string;
constructor(){
  this.city_level = 'assets/images/godizlla level1.png'
  this.gzl_level = 'assets/images/godizlla level2.png'
  this.bc_level = 'assets/images/godzilla level3.png'
  this.cvr_white = 'assets/images/white-cover-home.png'
  this.manga_bc = './assets/images/manga-bc.png'
  this.anime_bc = './assets/images/anime-bc.png'
  this.gzl_r = './assets/images/godzilla-reg.png'
  this.gzl_e = './assets/images/godzilla-error.png'
}
}