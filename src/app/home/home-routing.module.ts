import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AdminComponent } from '../admin/admin.component';
import { AnalyticsComponent } from '../analytics/analytics.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent,  loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)  },
  { path: "analytics", component: AnalyticsComponent},
  { path: "admin", component: AdminComponent},
  { path: "dashboard", component: DashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
