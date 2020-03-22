import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { HomeComponent } from '../home/home.component';
import { DoctorsComponent } from '../doctors/doctors.component';
import { AppointmentsComponent } from '../appointments/appointments.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: HomeComponent
  },
  {
    path: 'doctors',
    canActivate: [AuthGuard],
    component: DoctorsComponent
  },
  {
    path: 'appointments',
    canActivate: [AuthGuard],
    component: AppointmentsComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
