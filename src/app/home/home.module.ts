import { NgModule } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { AdminComponent } from '../admin/admin.component';
import { AnalyticsComponent } from '../analytics/analytics.component';
import { AnalyticsService } from '../services/analytics.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@NgModule({
  declarations:[
    HomeComponent,
    NavBarComponent,
    DashboardComponent,
    AdminComponent,
    AnalyticsComponent
  ],
  imports:[
    HomeRoutingModule,
    MenubarModule,
    CardModule,
    ButtonModule,
    TabMenuModule,
    TableModule,
    CommonModule,
    InputTextModule,
    AvatarModule,
    AvatarGroupModule
  ],
  providers: [AnalyticsService]
})
export class HomeModule { }
