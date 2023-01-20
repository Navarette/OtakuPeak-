import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-genere-register',
  templateUrl: './genere-register.component.html',
  styleUrls: ['./genere-register.component.css']
})
export class GenereRegisterComponent {
  nome! : any;
  url: string = "https://3000-ghebr0us-otakupeak-i9w30u3vcd4.ws-eu83.gitpod.io/genereAnime";
  constructor(public http : HttpClient){
    this.get(this.url);
  }
  get(url: string): void {
    this.http.get(url).subscribe(data => {
      this.nome = data;
      for (let i = 0; i < this.nome.length; i++) {
        this.nome[i].checked = false;
      }
      console.log(data);
    });
  }
  parse(s: string): string {
    return "genere" + s;
  }
  click(event: any) {
    event.preventDefault();
    let scelta = this.nome.filter((g: { checked: boolean; }) => g.checked == true)
    window.location.href = "/Home" + scelta.map((g: {nome: String}) => g.nome).join(",")
  }
  update(n: any, event: any) {
    this.nome[this.nome.indexOf(n)].checked = event.target.checked;
  }
}
