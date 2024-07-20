import { Component } from '@angular/core';
import { Router } from 'express';
import { UserService } from './services/user.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  constructor(private primengConfig: PrimeNGConfig) {}

/*
  constructor(private router: Router, private service: UserService, private http: HttpClient, private authService: AuthService) {
    localStorage.setItem("token", "");
  } */

}
