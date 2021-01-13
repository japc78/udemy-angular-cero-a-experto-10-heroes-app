import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { HeroModel } from '../../models/hero.model';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';


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

    Swal.fire({
      title: 'Wait',
      text: 'Save data',
      icon: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    let request: Observable<HeroModel>;

    if (this.hero.id) {
      request = this.heroesService.updateHero(this.hero);
    } else {
      request = this.heroesService.createHero(this.hero);
    }

    request.subscribe(resp => {
      Swal.fire({
        title: this.hero.name,
        text: 'Correctly updated',
        icon: 'success'
      });
    });

    // console.log(form);
    // console.log(this.hero);
  }

}
