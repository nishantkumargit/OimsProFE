import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { MachinesComponent } from '../machines/machines.component';
import { PartComponent } from '../part/part.component';
import { NodeMCUComponent } from '../node-mcu/node-mcu.component';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: "machines", component: MachinesComponent },
  { path: "user", component: UserComponent},
  { path: "nodemcu", component: NodeMCUComponent},
  { path: "part", component: PartComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {}
