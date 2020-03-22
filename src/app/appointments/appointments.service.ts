import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { Appointment } from '../shared/models/appointment.model';

@Injectable()
export class AppointmentsService {
  private appointmentListSource = new BehaviorSubject<Appointment[]>([]);
  appointmentList$ = this.appointmentListSource.asObservable();

  constructor(private apiService: ApiService) { }

  loadAppointments() {
    return this.apiService.get('appointment').pipe(
      tap(result => this.appointmentListSource.next(result))
    );
  }

  create(appointment: Appointment) {
    return this.apiService.post('appointment', appointment).pipe(
      tap(() => this.loadAppointments().subscribe(() => console.log('Appointment created')))
    );
  }

  update(appointment: Appointment) {
    return this.apiService.put(`appointment/${appointment._id}`, appointment).pipe(
      tap(() => this.loadAppointments().subscribe(() => console.log('Appointment updated')))
    );
  }

  delete(appointmentId: string) {
    return this.apiService.delete(`appointment/${appointmentId}`).pipe(
      tap(() => this.loadAppointments().subscribe(() => console.log('Appointment deleted')))
    );
  }
}
