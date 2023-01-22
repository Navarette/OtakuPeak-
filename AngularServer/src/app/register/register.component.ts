import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Data } from 'src/models/registerData.model';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  url: string = "https://3000-ghebr0us-otakupeak-heq3c659ozp.ws-eu83.gitpod.io/Register";
  form!: FormGroup;
  errorMessage!: string;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private storage: StorageService
  ) { }


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
      console.log(data.data.id);
      console.log(data.errorMessage);

      if (data.statusCode == 200 ) {
        this.storage.saveData('id', data.data.id.toString())
        this.storage.saveData('email', data.data.email)
        this.storage.saveData('username', data.data.username)
        
        this.router.navigate(["Register/genere"]);
      } else {
        this.errorMessage = data.errorMessage;
      }
    })
  }
}

