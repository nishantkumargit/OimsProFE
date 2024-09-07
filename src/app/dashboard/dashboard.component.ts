import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

constructor(private router: Router, private route: ActivatedRoute){}

public navigateToadmin(): void {
  this.router.navigate(['admin'], { relativeTo: this.route.parent });
}

public navigateToAnalytics(): void {
  this.router.navigate(['analytics'], { relativeTo: this.route.parent });
}



}
