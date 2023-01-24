import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenereMangaComponent } from '../genere-manga/genere-manga.component';
import { Data } from 'src/models/manga.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-risultato-manga',
  templateUrl: './risultato-manga.component.html',
  styleUrls: ['./risultato-manga.component.css']
})
export class RisultatoMangaComponent {
  url: string = "https://3000-navarette-otakupeak-6jecxm0wkpy.ws-eu83.gitpod.io/RisultatoManga";
  manga!: any;
  status: String[] = [];
  rating: number = 0;
  filteredMangas: any;
  vettoreScelte!: any;
  generim: String[] = [];
  statoM: String[] = [];
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

  }

  get(url: string): void {
    this.http.get<Data[]>(url).subscribe(data => {
      for (const s of data) {
        this.generim.push(s.stato);
        this.status.push(s.stato);
      }
      this.filteredMangas = this.manga;
      this.status = this.dropDuplicate(this.status);
      this.manga = data;
      this.generim = this.dropDuplicate(this.generim);
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
        this.status.push(value)
      else
        // Altrimenti la rimuovo
        this.status.splice(this.status.indexOf(value), 1);
    }

    if (type == 'range') {
      // Associo il valore del range alla variabile globale della classe
      this.rating = value;
    }

    // console.log(isChecked, value, this.types, type, this.rating)

    // Applico il filtro all'array degli anime importato dal Database
    this.filteredMangas = this.manga.filter((a: any) => this.status.includes(a.stato) && parseInt(a.rating) >= this.rating);
  }
}
