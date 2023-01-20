import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-specifica-anime',
  templateUrl: './specifica-anime.component.html',
  styleUrls: ['./specifica-anime.component.css']
})
export class SpecificaAnimeComponent implements OnInit {
  url: string = "https://3000-ghebr0us-otakupeak-87h8ucxza4p.ws-eu83.gitpod.io/SpecificaAnime";
  tipo!: any;
  vettoreScelte!: any;

  constructor(private route: ActivatedRoute, public http: HttpClient) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);

        this.vettoreScelte = params['scelta'];
        console.log(this.vettoreScelte)
        this.url = this.url + "?scelta=" + this.vettoreScelte
        this.get(this.url);
      })

  } 
  get(url: string) {
    // this.http.get<Data[]>(url).subscribe(data => {
    //   for (const s of data) {
    //     this.generi.push(s.tipo)
      }
      // this.anime = data;
      // this.generi = this.dropDuplicate(this.generi);
    // });


  // private dropDuplicate(arr: String[]): String[] {
  //   arr = arr.filter((element, index) => {
  //     return arr.indexOf(element) === index;
  //   }).filter(el => el != null);
  //   return arr;
 }