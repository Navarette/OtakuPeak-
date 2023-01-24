import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Data } from 'src/models/LoginData.model';
import { ManagerService } from 'src/services/manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  url: string = "https://3000-navarette-otakupeak-6jecxm0wkpy.ws-eu83.gitpod.io/Login";
  form!: FormGroup;
  errorMessage!: string;
  yo!:any;
  statusCode!: number;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router,public  manager: ManagerService) { }


  ngOnInit(): void {
    if (this.manager.getUser.id != -1) this.router.navigate(['/dashboard']);

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
    }).subscribe(data => {
      if (data.statusCode == 200) {
        this.manager.setUser(data.data);
        localStorage.setItem('email', data.data.email);
        localStorage.setItem('username', data.data.username);
        localStorage.setItem('administrator', data.data.administrator.toString());
        this.router.navigate(["Home"]);
        
      } else {
        this.statusCode = data.statusCode;
        this.errorMessage = data.data.toString();;
      }
    })
    
  }
}
