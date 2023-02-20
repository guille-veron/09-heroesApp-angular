import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HeroeModel } from '../models/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private url = 'https://login-app-8d616-default-rtdb.firebaseio.com';
  constructor(private _http: HttpClient) {
    
   }

   crearHeroe(heroe: HeroeModel){
     return this._http.post(`${this.url}/heroes.json`,heroe)
      .pipe(
        map((resp:any) =>{
          heroe.id = resp.name;
          return heroe;
        })
      );
   }

   actualizarHeroe(heroe: HeroeModel){
    const heroeUpdate = {
      ...heroe
    }
    delete heroeUpdate.id;
    return this._http.put(`${this.url}/heroes/${heroe.id}.json`,heroeUpdate);     
  }

  
  borrarHeroe(id: string){
    return this._http.delete(`${this.url}/heroes/${id}.json`);            
  }

  getHeroes(){
    return this._http.get(`${this.url}/heroes.json`)
            .pipe(
              map(this.crearArreglo)
            );
  }
  
  getHeroe(id :string){
    return this._http.get(`${this.url}/heroes/${id}.json`);            
  }

  private crearArreglo(heroesObj: object){

    const heroes : HeroeModel[] = [];
    if (heroesObj === null) { return [] };

    Object.keys(heroesObj).forEach(key => {
      const heroe : HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);
    })

    return heroes;
  }
}
