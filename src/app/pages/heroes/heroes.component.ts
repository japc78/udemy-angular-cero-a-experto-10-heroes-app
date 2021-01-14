import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroModel } from '../../models/hero.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroModel[] = [];
  loading = true;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.heroesService.getHeroes()
      .subscribe(resp => {
        this.heroes = resp;
        this.loading = false;
      });
  }

  deleteHero( hero: HeroModel, idx): void {

    Swal.fire({
      title: 'Are you sure?',
      text: `'You are secure that you want delete the Hero: ${hero.name}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true

    }).then( resp => {
      if (resp.value) {
        this.heroes.splice(idx, 1);
        this.heroesService.deleteHero(hero.id).subscribe();
      }
    });
  }
}
