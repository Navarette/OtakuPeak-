import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Data } from 'src/models/anime.model';
import { GenereAnimeComponent } from '../genere-anime/genere-anime.component';

@Component({
  selector: 'app-risultato-anime',
  templateUrl: './risultato-anime.component.html',
  styleUrls: ['./risultato-anime.component.css']
})
export class RisultatoAnimeComponent implements OnInit {
  url: string = "https://3000-ghebr0us-otakupeak-106119ip20x.ws-eu83.gitpod.io/RisultatoAnime";
  anime!: any;
  types: String[] = [];
  rating: number = 0;
  filteredAnimes: any;
  vettoreScelte!: any;
  generi: String[] = [];
  tipi: String[] = [];
  loading!: Boolean;
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
    // for (let i = 0; i < this.vettoreScelte.length; i++) {
    //   let s = i == 0 ? "?" : "&";
    //   this.url = this.url + s +'scelta=' + this.vettoreScelte[i]
    // }

  }

  get(url: string): void {
    this.http.get<Data[]>(url).subscribe(data => {
      for (const s of data) {
        this.generi.push(s.tipo);
        this.types.push(s.tipo);
      }
      this.filteredAnimes = this.anime;
      this.types = this.dropDuplicate(this.types);
      this.anime = data;
      this.generi = this.dropDuplicate(this.generi);
    });
  }

  private dropDuplicate(arr: String[]): String[] {
    arr = arr.filter((element, index) => {
      return arr.indexOf(element) === index;
    }).filter(el => el != null);
    return arr;
  }
  changeType(e: any): void {
    // Ottengo il valore dell'input ed il tipo di input
    var value = e.target.value;
    var type = e.target.type;

    if (type == 'checkbox') {
      var isChecked = e.target.checked;

      // Controllo se e' selezionata la checkbox
      if (isChecked)
        // Se e' selezionata aggiungo il valore di essa al'array
        this.types.push(value)
      else
        // Altrimenti la rimuovo
        this.types.splice(this.types.indexOf(value), 1);
    }

    if (type == 'range') {
      // Associo il valore del range alla variabile globale della classe
      this.rating = value;
    }

    // console.log(isChecked, value, this.types, type, this.rating)

    // Applico il filtro all'array degli anime importato dal Database
    this.filteredAnimes = this.anime.filter((a: any) => this.types.includes(a.tipo) && parseInt(a.rating) >= this.rating);
  }
}