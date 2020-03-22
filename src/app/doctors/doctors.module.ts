import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsComponent} from './doctors.component';
import { DoctorsService } from './doctors.service';
import { AuthGuard } from '../auth/auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { DoctorsFormComponent } from './doctors-form/doctors-form.component';
import { DoctorListComponent } from './doctors-list/doctors-list.component';

@NgModule({
  declarations: [
    DoctorsComponent, DoctorsFormComponent, DoctorListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [
    DoctorsFormComponent,
  ],
  providers: [
    AuthGuard,
    DoctorsService
  ]
})
export class DoctorsModule {}
