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
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  publicacion = [{
    id:"DC Comics",
    desc:"DC - Comics"
  },{
    id:"Marvel Comics",
    desc:"Marvel - Comics"
  }];

  heroe:Heroe = {
    alter_ego : '',
    superhero:'',
    characters:'',
    first_appearance:'',
    publisher:Publisher.DCComics,
  } 

  constructor(private heroeService : HeroesService, private activatedRoute:ActivatedRoute, private route: Router, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    if(!this.route.url.includes('editar')){
      return
    }
    this.activatedRoute.params
    .pipe(
      switchMap(({id})=> this.heroeService.getHeroePorID(id))
    )
    .subscribe(heroe=> this.heroe= heroe)
  }

  guardarDatos(){
    if(this.heroe.superhero.trim().length === 0){return};
    if(this.heroe.id){
      //actualizar
      this.heroeService.actualizarHeroe(this.heroe).subscribe(heroe => this.mostrarSnakbar('Registro Actualizado'))
    }else{
      //guardar
      this.heroeService.agregarHeroe(this.heroe).subscribe((heroe)=>{
        this.route.navigate(['/heroes/editar', heroe.id])
        this.mostrarSnakbar('Registro Guardado')
      });
    }
  }
  borrarDatos(){
    // ConfirmarComponent
    const anuncio = this.dialog.open(ConfirmarComponent,{
      width:'250px',
      data: this.heroe
    });

    anuncio.afterClosed().subscribe(
      result=> {
        if(result){
          this.heroeService.borrarHeroe(this.heroe.id!).subscribe(resp =>{
            this.route.navigate(['/heroes']);
          })
        }
      }
    )
    
  }
  mostrarSnakbar(mensaje:string):void{
    this.snackBar.open(mensaje, 'aceptar',{
      duration:2500,
      
    })
  }

}
