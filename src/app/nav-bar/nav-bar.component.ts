import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
items: any;
buttonsNav: any;

constructor(private router: Router){}

public logout(): void {
  localStorage.setItem("token", "");
  this.router.navigate(['/login']);
}

}
