import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private autservice:AuthService, private router: Router ){

  }
   canActivate(
     route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // if(this.autservice.auth.id){return true}
      // console.log('bloaqueado por canActivate');
      // return false;
      // console.log(1)
      return this.autservice.verificarAuth()
      .pipe(
        tap(estado =>{
          if(!estado){
            this.router.navigate(['./auth/login'])
          }
        })
      )
   }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      // console.log(this.autservice.verificarAuth())
      return this.autservice.verificarAuth()

    //   if(this.autservice.auth.id){return true}
    //   console.log('bloaqueado')
    // return false;
  }
}
