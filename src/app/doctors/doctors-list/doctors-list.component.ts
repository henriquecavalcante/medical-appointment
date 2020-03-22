import { Component, OnDestroy, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DoctorsService } from '../doctors.service';
import { Doctor } from '../../shared/models/doctor.model';

const COLUMNS_DEFAULT = ['name', 'email', 'specialty', 'actions'];

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss']
})
export class DoctorListComponent implements OnDestroy, OnInit {
  private ngUnsubscribe$ = new Subject();

  isSmallScreen = false;
  displayedColumns: string[] = COLUMNS_DEFAULT;
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Output() openEditModal = new EventEmitter<any>();
  @Output() openDeleteModal = new EventEmitter<any>();

  constructor(
    private doctorService: DoctorsService,
  ) { }

  ngOnInit() {
    this.doctorService.doctorList$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(doctors => this.initDataSource(doctors));

    this.loadDoctors();

  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  loadDoctors() {
    this.doctorService
      .loadDoctors()
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

  editDoctor(doctor: Doctor) {
    this.openEditModal.emit(doctor);
  }

  deleteDoctor(doctor: Doctor) {
    this.openDeleteModal.emit(doctor);
  }
}
