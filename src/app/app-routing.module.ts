import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PermissionGuard } from './auth.guard';
import { LoginPermissionGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', canActivate: [LoginPermissionGuard], component: LoginComponent },
  { path: 'home', canActivate: [PermissionGuard], component: HomeComponent,  loadChildren: () => import('./home/home.module').then(m => m.HomeModule)  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
