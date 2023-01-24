import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user.model';
import { ManagerService } from 'src/services/manager.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User = new User();

  constructor(
    private router: Router,
    private manager: ManagerService
  ) { }

  ngOnInit(): void {
    // Controllo se l'utente ha eseguito il login
    this.isLogged();

    // Mostro le informazioni dell'utenye
    this.user = this.manager.getUser;

    // Controllo semple se l'utente esegue il log out
    this.manager.userListener.subscribe(user => {this.user = user; this.isLogged();})
  }

  isLogged() {
    if (this.manager.getUser.id == -1) this.router.navigate(['']);
  }

  logOut() {
    // Reimposto l'utente
    this.manager.setUser(new User());
  }
}