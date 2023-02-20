import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor(private _heroesService: HeroesService,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this._heroesService.getHeroe(id)
        .subscribe((resp:HeroeModel) => {
          this.heroe = resp;
          this.heroe.id = id;
        })
    }
  }

  guardar(form: NgForm){
    if (form.invalid) {
      console.log('Formulario no válido');
      return;  
    }
    Swal.fire({
      title: 'Espere...',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.heroe.id) {     
      peticion = this._heroesService.actualizarHeroe(this.heroe);      
    }else{
      peticion = this._heroesService.crearHeroe(this.heroe);      
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'se actualizó correctamente',
        icon: 'success'
      });     
    })
  }

}
