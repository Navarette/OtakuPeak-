import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-genere-manga',
  templateUrl: './genere-manga.component.html',
  styleUrls: ['./genere-manga.component.css']
})
export class GenereMangaComponent {
  nome! : any;
  url: string = "https://3000-ghebr0us-otakupeak-i9w30u3vcd4.ws-eu83.gitpod.io/GenereManga";
  
  constructor(public http : HttpClient){
    this.get(this.url);
  }
  get(url: string): void {
    this.http.get(url).subscribe(data => {
      this.nome = data;
      console.log(data);
      for (let i = 0; i < this.nome.length; i++) {
        this.nome[i].checked = false;}
        console.log(data);
    });
  }
  parse(s: string): string {
    return "genere" + s;
  }
  click(event: any) {
    event.preventDefault();
    let scelta = this.nome.filter((g: { checked: boolean; }) => g.checked == true)
    window.location.href = "/RisultatoManga?scelta=" + scelta.map((g: {nome: String}) => g.nome).join(",")
  }
  update(n: any, event: any) {
    this.nome[this.nome.indexOf(n)].checked = event.target.checked;
  }
}
