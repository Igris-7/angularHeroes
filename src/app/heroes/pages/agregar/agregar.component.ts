import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
    img{
      width: 100%;
      border-radius : 20px;
    }
    `
  ]
})
export class AgregarComponent implements OnInit {


  publishers = [
    {
      id: 'DC Comics',
      desc : 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe : Heroe = 
  {
    superhero : '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(private heroeService : HeroesService, 
              private activateRoute : ActivatedRoute,
              private router : Router,
              private _snackBar : MatSnackBar,
              public dialog: MatDialog) { }

//router para navegar

  ngOnInit(): void {

    if(!this.router.url.includes('editar'))
    {
      return;
    }

    this.activateRoute.params
    .pipe(
      switchMap(({id}) => this.heroeService.getHeroePorId(id))
    ).subscribe( heroe => 
      this.heroe = heroe);
  }

  guardar()
  {
    if(this.heroe.superhero.trim().length ===0)
    {
      return;
    }

    if(this.heroe.id)
    {
      //actualiza
      this.heroeService.actualizarHeroe(this.heroe)
      .subscribe(heroe =>
        {
          this.mostrarSnackBar('Registro actualizado');
          console.log('Actualizando', heroe);
        })

    }else{
      //agregando
      this.heroeService.agregarHeroe(this.heroe)
   .subscribe( hero =>
    {
      this.mostrarSnackBar('Registro creado');
      this.router.navigate(['/heroes/editar',hero.id])
    });
    }

  }

  borrarHeroe()
  {

    const dialog = this.dialog.open(ConfirmarComponent , {
      width: '250px',
      data : {...this.heroe} 
      //operador spred nada se modifica / mandando informacion del padre al hijo
    })

    dialog.afterClosed().subscribe(
      (result) =>
      {
        if(result)
        {
          
          this.heroeService.eliminarHeroe(this.heroe.id!)
          .subscribe( resp =>
            {
              this.router.navigate(['/heroes'])
            })

        }
      }
    )
 
  }

  mostrarSnackBar(mensaje : string)
  {
    this._snackBar.open(mensaje, 'ok!', {
      duration : 2500
    })
  }



}
