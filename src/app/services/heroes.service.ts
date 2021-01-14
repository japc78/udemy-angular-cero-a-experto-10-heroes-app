import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroModel } from '../models/hero.model';
import { map, delay } from 'rxjs/operators';
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

  updateHero(hero: HeroModel): Observable<HeroModel> {
    // Para borrar el id y no lo cree como atributo de nuevo.
    const heroTemp = {...hero};
    delete heroTemp.id;

    return this.http.put(`${this.URL}/heroes/${hero.id}.json`, heroTemp)
      .pipe(
        map( (resp: any) => {
          hero.id = resp.name;
          return hero;
        })
      );
  }

  getHero(id: string): Observable<any> {
    return this.http.get(`${this.URL}/heroes/${id}.json`);
  }

  deleteHero(id: string) {
    return this.http.delete(`${this.URL}/heroes/${id}.json`);
  }

  getHeroes(): Observable<HeroModel[]> {
    return this.http.get(`${this.URL}/heroes.json`)
      .pipe(
        // map( (resp: any) => {
        //   return this.parseDataToArrayHeroes(resp);
        // })

        // Version reducida.
        map(this.parseDataToArrayHeroes),
        delay(1000)
      );
      // pipe podemos utilizar el map para modific`)
  }

  private parseDataToArrayHeroes(firebaseData: object): HeroModel[] {

    const heroes: HeroModel[] = [];
    // console.log(firebaseData);

    if (firebaseData === null) { return []; }

    Object.keys( firebaseData ).forEach(key => {
      const hero: HeroModel = firebaseData[key];
      hero.id = key;

      heroes.push( hero );
    });

    return heroes;
  }
}
