import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  get auth(){
    return this.authservice.auth
  }
  constructor(private route:Router, private authservice:AuthService) { }

  ngOnInit(): void {
  }

  logaut(){
    this.authservice.logaut()
    this.route.navigate(['./auth/login']);
  }
}
