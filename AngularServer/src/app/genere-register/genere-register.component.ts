import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from 'src/models/simpleRequest.model';
import { Selected } from 'src/models/selected.model';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-genere-register',
  templateUrl: './genere-register.component.html',
  styleUrls: ['./genere-register.component.css']
})
export class GenereRegisterComponent {
  nome! : any;
  url: string = "https://3000-navarette-otakupeak-6jecxm0wkpy.ws-eu83.gitpod.io";
  selected: Selected[] = []
  errorMessage: string = "";

  constructor(
    private http : HttpClient,
    private router: Router,
    private storage: StorageService
    ){
    this.get(this.url);
  }

  get(url: string): void {
    this.http.get(url + '/genereAnime').subscribe(data => {
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
  submit() {
    let body: HttpParams = new HttpParams();
    body = body.appendAll({
      id: this.storage.getData('id') || -1,
      generi: JSON.stringify(this.selected)
    });

    this.http.post<Data>(this.url + '/saveprefs', '', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: body,
      responseType: "json"
    }).subscribe(data => {
      console.log(data);

      if (data.statusCode == 200 ) {
        this.router.navigate(["Home"]);
      } else {
        this.errorMessage = data.errorMessage;
      }
    })
  }

  update(id: number, name: string, event: any) {
    var checked = event.target.checked;

    if(checked) {
      this.selected.push({id, name})
    } else {
      this.selected.splice(this.selected.map(o => o.id).indexOf(id), 1);
    }
    console.log(name, id, checked, this.selected)
    console.table(this.selected)
  }
}