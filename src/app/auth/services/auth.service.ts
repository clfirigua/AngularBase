import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { tap,map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseurl:string =environment.baseUrl;
  private Authuser : Auth| undefined;

  constructor(private http: HttpClient) { }

  get auth():Auth{
    return {... this.Authuser!}
  }

  login(){
    return this.http.get<Auth>(`${this.baseurl}/usuarios/1`).pipe(
      tap(resp => this.Authuser = resp),
      tap(resp => localStorage.setItem('token', resp.id))
    )
  }

  logaut(){
    this.Authuser = undefined;
  }

  verificarAuth():Observable<boolean>{
    if(!localStorage.getItem('token')){
      return of(false) 
    }
    return this.http.get<Auth>(`${this.baseurl}/usuarios/1`)
    .pipe(
      map(auth => {
        return true
      })
    )
  }
}
