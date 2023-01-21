import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-titolo-anime',
  templateUrl: './titolo-anime.component.html',
  styleUrls: ['./titolo-anime.component.css']
})
export class TitoloAnimeComponent {
  titoloa!: any;
  loading!: Boolean;
  url: string = "https://3000-ghebr0us-otakupeak-0qltod93fvs.ws-eu83.gitpod.io/titoloAnime";

  constructor(public http: HttpClient) {
    this.get(this.url);
  }

  get(url: string): void {
    this.loading = true;
    this.http.get(url).subscribe(data => {
      this.titoloa = data;
      this.loading = false;
    });
  }

  onKey(value: string) {
    this.get(this.url + "?titoloa=" + value);
  }
}
