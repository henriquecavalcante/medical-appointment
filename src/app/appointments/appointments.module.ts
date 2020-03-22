import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import {AppointmentsComponent} from './appointments.component';
import {AuthGuard} from '../auth/auth-guard.service';
import { AppointmentsService } from './appointments.service';
import { AppointmentsFormComponent } from './appointments-form/appointments-form.component';
import { AppointmentListComponent } from './appointments-list/appointments-list.component';

@NgModule({
  declarations: [
    AppointmentsComponent, AppointmentsFormComponent, AppointmentListComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
  ],
 entryComponents: [
    AppointmentsFormComponent,
  ],
  providers: [
    AuthGuard,
    AppointmentsService
  ]})
export class AppointmentsModule {}
