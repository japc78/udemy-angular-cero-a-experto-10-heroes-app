import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { HeroModel } from '../../models/hero.model';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  hero: HeroModel;

  constructor( private heroesService: HeroesService) {
    this.hero = new HeroModel();
   }

  ngOnInit(): void {
  }

  safeForm(form: NgForm): void {

    if (form.invalid) {
      console.log('Invalid form');
      return;
    }

    this.heroesService.createHero(this.hero)
      .subscribe( resp => {
        console.log(resp);
      });

    console.log(form);
    console.log(this.hero);
  }
}
