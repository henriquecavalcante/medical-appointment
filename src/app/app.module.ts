import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { AuthHeaderInterceptor } from './interceptors/header.interceptor';
import { CatchErrorInterceptor } from './interceptors/http-error.interceptor';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DoctorsFormComponent } from './doctors/doctors-form/doctors-form.component';
import { DoctorsService } from './doctors/doctors.service';
import { ApiService } from './services/api.service';
import { DoctorListComponent } from './doctors/doctors-list/doctors-list.component';
import { ModalBasicComponent } from './shared/components/modal-basic/modal-basic.component';
import { AppointmentsFormComponent } from './appointments/appointments-form/appointments-form.component';
import { AppointmentListComponent } from './appointments/appointments-list/appointments-list.component';
import { AppointmentsService } from './appointments/appointments.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ModalBasicComponent,
    HomeComponent,
    DoctorsComponent,
    DoctorsFormComponent,
    DoctorListComponent,
    AppointmentsComponent,
    AppointmentsFormComponent,
    AppointmentListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    AuthModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true,
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: CatchErrorInterceptor,
      multi: true,
    },
    ApiService,
    DoctorsService,
    AppointmentsService
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
