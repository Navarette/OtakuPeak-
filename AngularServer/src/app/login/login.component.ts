import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Data } from 'src/models/LoginData.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  url: string = "https://3000-ghebr0us-otakupeak-0qltod93fvs.ws-eu83.gitpod.io/Login";
  form!: FormGroup;
  errorMessage!: string;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) { }


  ngOnInit(): void {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required]]
    });
  }
  

  submit() {
    let body: HttpParams = new HttpParams();
    body = body.appendAll({
      email: this.form.value.email,
      pwd: this.form.value.pwd
    });

    this.http.post<Data>(this.url, '', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: body,
      responseType: "json"
    }).subscribe(data => {
      console.log(data);

      if(data.statusCode == 200) {
        this.router.navigate(["Home"]);
      } else {
        this.errorMessage = data.data;
      }
    })
  }
}
