import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { HeroModel } from '../../models/hero.model';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  hero: HeroModel;

  constructor() {
    this.hero = new HeroModel();
   }

  ngOnInit(): void {
  }

  safeForm(form: NgForm): void {

    if (form.invalid) {
      console.log('Invalid form');
      return;
    }

    console.log(form);
    console.log(this.hero);
  }
}
