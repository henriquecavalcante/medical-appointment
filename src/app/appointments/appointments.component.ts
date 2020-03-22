import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentsFormComponent } from './appointments-form/appointments-form.component';
import { AlertService } from '../services/alert.service';
import { AppointmentsService } from './appointments.service';
import { Appointment } from '../shared/models/appointment.model';
import { ModalBasicComponent } from '../shared/components/modal-basic/modal-basic.component';
import { DoctorsService } from '../doctors/doctors.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
})
export class AppointmentsComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private alertService: AlertService,
    private appointmentsService: AppointmentsService) {}

  ngOnInit() { }

  openAppointmentsForm(appointment: Appointment): void {
    const editMode = appointment && appointment._id;
    const dialogRef = this.dialog.open(AppointmentsFormComponent, {
      width: '450px',
      disableClose: true,
      data: appointment || {}
    });

    dialogRef.afterClosed().subscribe((newAppointment) => {
      if (!newAppointment) return;

      if (editMode) {
        this.appointmentsService
          .update(newAppointment)
          .subscribe(
            (data) => {
              this.alertService.show('Consulta editada com sucesso!');
            },
            (err) => {
              this.alertService.show('Erro ao edidar Consulta!');
            }
          );
      } else {
        this.appointmentsService
          .create(newAppointment)
          .subscribe(
            (data) => {
              this.alertService.show('Consulta criada com sucesso!');
            },
            (err) => {
              this.alertService.show('Erro ao cadastrar Consulta!');
            }
          );
      }
    });
  }

  deleteAppointment(appointment: Appointment): void {
    const dialogRef = this.dialog.open(ModalBasicComponent, {
      width: '400px',
      data: {
        title: 'Deletar Consulta',
        body: `Você realmente deseja detelar esta Consulta?`,
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.appointmentsService
          .delete(appointment._id)
          .subscribe(
            (data) => {
              this.alertService.show('Consulta deletada com sucesso!');
            },
            (err) => {
              this.alertService.show('Erro ao deletar Consulta!');
            }
          );
      }
    });
  }
}


