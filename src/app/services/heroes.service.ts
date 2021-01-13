import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroModel } from '../models/hero.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private readonly URL = 'https://udemy-angular-heroes-app-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }

  createHero(hero: HeroModel): Observable<HeroModel> {
    return this.http.post(`${this.URL}/heroes.json`, hero)
      // pipe podemos utilizar el map para modificar la resp y asi devolver lo deseado
      .pipe(
        map( (resp: any) => {
          hero.id = resp.name;
          return hero;
        })
      );
  }
}
