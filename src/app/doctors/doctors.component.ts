import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DoctorsFormComponent } from './doctors-form/doctors-form.component';
import { AlertService } from '../services/alert.service';
import { DoctorsService } from './doctors.service';
import { Doctor } from '../shared/models/doctor.model';
import { ModalBasicComponent } from '../shared/components/modal-basic/modal-basic.component';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
})
export class DoctorsComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private alertService: AlertService,
    private doctorsService: DoctorsService) {}

  ngOnInit() { }

  openDoctorsForm(doctor: Doctor): void {
    const editMode = doctor && doctor._id;
    const dialogRef = this.dialog.open(DoctorsFormComponent, {
      width: '450px',
      disableClose: true,
      data: doctor || {}
    });

    dialogRef.afterClosed().subscribe((newDoctor) => {
      if (!newDoctor) return;

      if (editMode) {
        this.doctorsService
          .update(newDoctor)
          .subscribe(
            (data) => {
              this.alertService.show('Médico editado com sucesso!');
            },
            (err) => {
              this.alertService.show('Erro ao edidar Médico!');
            }
          );
      } else {
        this.doctorsService
          .create(newDoctor)
          .subscribe(
            (data) => {
              this.alertService.show('Médico criado com sucesso!');
            },
            (err) => {
              this.alertService.show('Erro ao cadastrar Médico!');
            }
          );
      }
    });
  }

  deleteDoctor(doctor: Doctor): void {
    const dialogRef = this.dialog.open(ModalBasicComponent, {
      width: '400px',
      data: {
        title: 'Deletar Médico',
        body: `Você realmente deseja detelar o médico ${doctor.name}?`,
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.doctorsService
          .delete(doctor._id)
          .subscribe(
            (data) => {
              this.alertService.show('Médico deletado com sucesso!');
            },
            (err) => {
              this.alertService.show('Erro ao deletar médico!');
            }
          );
      }
    });
  }
}


