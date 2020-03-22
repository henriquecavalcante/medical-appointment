import { Component, OnDestroy, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppointmentsService } from '../appointments.service';
import { Appointment } from '../../shared/models/appointment.model';

const COLUMNS_DEFAULT = ['patient', 'doctor', 'scheduleDate', 'scheduleTime', 'actions'];

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.scss']
})
export class AppointmentListComponent implements OnDestroy, OnInit {
  private ngUnsubscribe$ = new Subject();

  isSmallScreen = false;
  displayedColumns: string[] = COLUMNS_DEFAULT;
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Output() openEditModal = new EventEmitter<any>();
  @Output() openDeleteModal = new EventEmitter<any>();

  constructor(
    private appointmentService: AppointmentsService,
  ) { }

  ngOnInit() {
    this.appointmentService.appointmentList$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(appointments => this.initDataSource(appointments));

    this.loadAppointments();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  loadAppointments() {
    this.appointmentService
      .loadAppointments()
      .subscribe(data => {}, err => {});
  }

  initDataSource(data) {
    if (this.dataSource == null) {
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (obj: any, filter) => {
        const dataStr = JSON.stringify(obj).toLowerCase();
        return dataStr.indexOf(filter.trim().toLowerCase()) !== -1;
      };
    } else {
      this.dataSource.data = data;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editAppointment(appointment: Appointment) {
    this.openEditModal.emit(appointment);
  }

  deleteAppointment(appointment: Appointment) {
    this.openDeleteModal.emit(appointment);
  }
}
