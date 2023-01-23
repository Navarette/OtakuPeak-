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
  url: string = "https://3000-ghebr0us-otakupeak-106119ip20x.ws-eu83.gitpod.io/Login";
  form!: FormGroup;
  errorMessage!: string;
  yo!:any;

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
    console.log(body)
    this.http.post<Data>(this.url, '', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: body,
      responseType: "json"
    }).subscribe(res => {
      if (res.statusCode == 200) {
        
        localStorage.setItem('email',res.data[0].email);
        localStorage.setItem('id',res.data[0].id);
        localStorage.setItem('username',res.data[0].username);
        this.router.navigate(["Home"]);
        
      } else {
        this.errorMessage = res.data;
      }
    })
    
  }
}
