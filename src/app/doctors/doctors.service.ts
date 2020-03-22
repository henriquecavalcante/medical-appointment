import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { Doctor } from '../shared/models/doctor.model';

@Injectable()
export class DoctorsService {
  private doctorListSource = new BehaviorSubject<Doctor[]>([]);
  doctorList$ = this.doctorListSource.asObservable();

  constructor(private apiService: ApiService) { }

  loadDoctors() {
    return this.apiService.get('doctor').pipe(
      tap(result => this.doctorListSource.next(result))
    );
  }

  create(doctor: Doctor) {
    return this.apiService.post('doctor', doctor).pipe(
      tap(() => this.loadDoctors().subscribe(() => console.log('Doctor created')))
    );
  }

  update(doctor: Doctor) {
    return this.apiService.put(`doctor/${doctor._id}`, doctor).pipe(
      tap(() => this.loadDoctors().subscribe(() => console.log('Doctor updated')))
    );
  }

  delete(doctorId: string) {
    return this.apiService.delete(`doctor/${doctorId}`).pipe(
      tap(() => this.loadDoctors().subscribe(() => console.log('Doctor deleted')))
    );
  }
}
