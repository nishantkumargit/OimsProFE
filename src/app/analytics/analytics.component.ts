import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../services/analytics.service';
import { Product } from '../product';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit{
  products!: Product[];
  products1!: any[];

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
      this.analyticsService.getProductsMini().then((data) => {
          this.products = data;
      });
  }
}
