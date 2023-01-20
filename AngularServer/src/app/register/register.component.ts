import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Data } from 'src/models/redirectData.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  url: string = "https://3000-ghebr0us-otakupeak-87h8ucxza4p.ws-eu83.gitpod.io/Register";
  form!: FormGroup;
  errorMessage!: string;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) { }


  ngOnInit(): void {
    this.form = this.fb.group({
      username: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required]]
    });
  }
  

  submit() {
    let body: HttpParams = new HttpParams();
    body = body.appendAll({
      username: this.form.value.username,
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

      if(data.url != null) {
        this.router.navigate(["GenereRegister"]);
      } else {
        this.errorMessage = data.data;
      }
    })
  }
}

