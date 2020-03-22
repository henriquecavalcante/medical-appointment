import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppointmentsComponent } from './appointments.component';
import { AuthGuard } from '../auth/auth-guard.service';

const routes: Routes = [{
  path: 'appointments',
  canActivate: [AuthGuard],
  children: [{
    path: '',
    component: AppointmentsComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AppointmentsRoutingModule {}
