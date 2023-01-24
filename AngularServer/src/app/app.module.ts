import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TitoloAnimeComponent } from './titolo-anime/titolo-anime.component';
import { TipoRicercaAnimeComponent } from './tipo-ricerca-anime/tipo-ricerca-anime.component';
import { TipoRicercaMangaComponent } from './tipo-ricerca-manga/tipo-ricerca-manga.component';
import { GenereAnimeComponent } from './genere-anime/genere-anime.component';
import { GenereMangaComponent } from './genere-manga/genere-manga.component';
import { RisultatoAnimeComponent } from './risultato-anime/risultato-anime.component';
import { RisultatoMangaComponent } from './risultato-manga/risultato-manga.component';
import { AppRoutingModule } from './app-routing.module';
import { TitoloMangaComponent } from './titolo-manga/titolo-manga.component';
import { StartComponent } from './start/start.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { GenereRegisterComponent } from './genere-register/genere-register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BackEndComponent } from './back-end/back-end.component';

@NgModule({
  declarations: [
    AppComponent,
    TitoloAnimeComponent,
    TipoRicercaAnimeComponent,
    TipoRicercaMangaComponent,
    GenereAnimeComponent,
    GenereMangaComponent,
    RisultatoAnimeComponent,
    RisultatoMangaComponent,
    TitoloMangaComponent,
    StartComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    GenereRegisterComponent,
    DashboardComponent,
    BackEndComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
