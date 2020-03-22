import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Doctor } from '../../shared/models/doctor.model';

@Component({
  selector: 'app-doctors-form',
  templateUrl: 'doctors-form.component.html',
})
export class DoctorsFormComponent {
  doctorForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [ Validators.required, Validators.email ]],
    specialty: ['', Validators.required],
  });

  doctor: Doctor;
  editMode = false;

  constructor(
    public dialogRef: MatDialogRef<DoctorsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Doctor,
    private formBuilder: FormBuilder) {

    if (data && data._id) {
      this.doctorForm.patchValue(data);
      this.doctor = data;
      this.editMode = true;
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onConfirm(): void {
    if (this.doctorForm.invalid) return;

    const doctor = this.doctorForm.value;

    if (this.doctor && this.doctor._id) {
      doctor._id = this.doctor._id;
    }

    this.dialogRef.close(doctor);
  }
}
