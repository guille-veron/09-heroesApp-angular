import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false;
  
  constructor(private _heroesService: HeroesService) { }

  ngOnInit(): void {
    this.cargando = true;
    this._heroesService.getHeroes()
      .subscribe(resp => {
        this.heroes = resp;
        this.cargando = false;        
      });
  }

  borrarHeroe(heroe: HeroeModel, i:number){

    Swal.fire({
      title:'¿Está Seguro?',
      text: `Esta seguro que desea borrar a ${heroe.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.heroes.splice(i,1);
        this._heroesService.borrarHeroe(heroe.id).subscribe()    
      }
    })

    
  }

}
