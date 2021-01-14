import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { HeroModel } from '../../models/hero.model';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  hero: HeroModel;


  constructor(
    private heroesService: HeroesService,
    private route: ActivatedRoute) {
    this.hero = new HeroModel();
   }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'new') {
      this.heroesService.getHero(id)
        .subscribe( (hero: HeroModel) => {
          hero.id = id;
          this.hero = hero;
        });
    }
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
