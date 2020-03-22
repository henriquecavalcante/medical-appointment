import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Appointment } from '../../shared/models/appointment.model';
import { DoctorsService } from '../../doctors/doctors.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-appointments-form',
  templateUrl: 'appointments-form.component.html',
})
export class AppointmentsFormComponent implements OnInit {
  private ngUnsubscribe$ = new Subject();

  appointmentForm = this.formBuilder.group({
    doctor: ['', Validators.required],
    scheduleDate: ['', Validators.required],
    scheduleTime: ['', Validators.required],
  });

  appointment: Appointment;
  editMode = false;
  doctors = [];
  minDate = new Date;

  constructor(
    public dialogRef: MatDialogRef<AppointmentsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Appointment,
    private formBuilder: FormBuilder,
    private doctorsService: DoctorsService) {

    if (data && data._id) {
      this.appointmentForm.patchValue(data);
      this.appointment = data;
      this.editMode = true;
    }
  }

  ngOnInit() {
    this.doctorsService.doctorList$
    .pipe(takeUntil(this.ngUnsubscribe$))
    .subscribe(doctors => this.doctors = doctors);

    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorsService
      .loadDoctors()
      .subscribe(
        data => {},
        err => {});
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onConfirm(): void {
    if (this.appointmentForm.invalid) return;

    const appointment = this.appointmentForm.value;
    appointment.patient = (<any>window).user._id;

    if (this.appointment && this.appointment._id) {
      appointment._id = this.appointment._id;
    }

    this.dialogRef.close(appointment);
  }
}
