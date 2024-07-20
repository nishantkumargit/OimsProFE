import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { CompanyComponent } from '../company/company.component';
import { MachinesComponent } from '../machines/machines.component';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: "machines", component: MachinesComponent },
  { path: "user", component: UserComponent},
  { path: "company", component: CompanyComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {}
