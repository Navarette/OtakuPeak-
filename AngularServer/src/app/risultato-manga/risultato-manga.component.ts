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
  url: string = "https://3000-ghebr0us-otakupeak-edj4ug44u7i.ws-eu83.gitpod.io/RisultatoManga";
  generim: String[] = [];
  vettoreScelte! : any;
  manga!:any;
  tipi: String[] = [];
  
  constructor(private route: ActivatedRoute, public http : HttpClient){
    
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); 

      this.vettoreScelte =  params['scelta'];
      console.log(this.vettoreScelte)
      this.url = this.url + "?scelta=" + this.vettoreScelte
      this.get(this.url);
      })
    
    }
      
  get(url: string): void {
    this.http.get<Data[]>(url).subscribe(data => {
      for(const s of data){
        this.generim.push(s.stato)
      }
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
}
