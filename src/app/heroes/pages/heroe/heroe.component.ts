import { Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { switchMap,tap } from 'rxjs/operators';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe!:Heroe;
  constructor(private parametroruta:ActivatedRoute,private http:HeroesService, private ruta: Router) { }

  ngOnInit(): void {
    this.parametroruta.params
    .pipe(
      switchMap(({id})=> this.http.getHeroePorID(id))
    ).subscribe(
      (heroe)=> this.heroe=heroe
    )
  }

  regresar(){
    this.ruta.navigate(['/heroes/listado'])
  }

}
