import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from "rxjs/operators";


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
    img
    {
      width : 100%;
      border-radius : 10px;
    }
    `
  ]
})
export class HeroeComponent implements OnInit {


  heroe !: Heroe; //typeScript heroe tendra un dato

  constructor(private activatedRoute : ActivatedRoute,
              private heroesService : HeroesService,
              private router: Router) { }

  ngOnInit(): void {

    
    /*this.activatedRoute.params
    .subscribe( ({id}) =>
    {
      console.log(id);
      
      this.heroesService.getHeroePorId(id)
      .subscribe( hero => 
        this.heroe = hero);

    })
    */

    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.heroesService.getHeroePorId( id))
    )
    .subscribe( heroe => this.heroe = heroe) ;

  }

  regresar()
  {
    this.router.navigate(['/heroes/listado']);
  }

}
