import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, debounceTime, switchMap, tap } from 'rxjs';
import { Doctor } from 'src/app/models';
import { DoctorService } from 'src/app/services';
import { capitalize } from 'src/app/shared/utils/capitalize';

@Component({
  selector: 'app-doctor-search',
  templateUrl: './doctor-search.component.html',
  styleUrls: ['./doctor-search.component.scss'],
})
export class DoctorSearchComponent implements OnInit {
  constructor(
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private route: Router
  ) {}

  searchForm: FormGroup | undefined;
  doctors$: Observable<Doctor[]> | undefined;

  ngOnInit(): void {
    this.loadAllDoctors();
    this.createSearchForm();
    this.getSearchFormValues();
  }

  loadAllDoctors(): void {
    this.doctors$ = this.doctorService.getAllDoctors();
  }

  createSearchForm() {
    this.searchForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    });
  }

  getSearchFormValues() {
    this.searchForm?.valueChanges
      .pipe(debounceTime(1500))
      .subscribe(({ firstName, lastName }) => {
        if (firstName === '' && lastName === '') {
          this.loadAllDoctors();
        } else {
          const firstname = capitalize(firstName?.toLowerCase());
          const lastname = capitalize(lastName?.toLowerCase());
          this.doctors$ = this.doctorService.searchForDoctor(
            firstname,
            lastname
          );
        }
      });
  }

  doctorBook(doctor: Doctor) {
    this.route.navigate([`shell/booking/`, doctor.entityNo]);
  }
}
