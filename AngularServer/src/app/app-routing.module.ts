import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StartComponent } from './start/start.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TipoRicercaAnimeComponent } from './tipo-ricerca-anime/tipo-ricerca-anime.component';
import { TitoloAnimeComponent } from './titolo-anime/titolo-anime.component';
import { SpecificaAnimeComponent } from './specifica-anime/specifica-anime.component';
import { GenereAnimeComponent } from './genere-anime/genere-anime.component';
import { RisultatoAnimeComponent } from './risultato-anime/risultato-anime.component';
import { TipoRicercaMangaComponent } from './tipo-ricerca-manga/tipo-ricerca-manga.component';
import { TitoloMangaComponent } from './titolo-manga/titolo-manga.component';
import { SpecificaMangaComponent } from './specifica-manga/specifica-manga.component';
import { GenereMangaComponent } from './genere-manga/genere-manga.component';
import { RisultatoMangaComponent } from './risultato-manga/risultato-manga.component';
import { GenereRegisterComponent } from './genere-register/genere-register.component';

export const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'Home', component: HomeComponent },

  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'Register/genere', component: GenereRegisterComponent },

  { path: 'TipoRicercaAnime', component: TipoRicercaAnimeComponent },
  { path: 'TitoloAnime', component: TitoloAnimeComponent },
  { path: 'SpecificaAnime', component: SpecificaAnimeComponent },
  { path: 'GenereAnime', component: GenereAnimeComponent },
  { path: 'RisultatoAnime', component: RisultatoAnimeComponent },
  
  { path: 'TipoRicercaManga', component: TipoRicercaMangaComponent },
  { path: 'TitoloManga', component: TitoloMangaComponent },
  { path: 'SpecificaManga', component: SpecificaMangaComponent },
  { path: 'GenereManga', component: GenereMangaComponent },
  { path: 'RisultatoManga', component: RisultatoMangaComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
