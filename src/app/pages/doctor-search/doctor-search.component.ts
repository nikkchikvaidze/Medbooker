import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, debounceTime, takeUntil, tap } from 'rxjs';
import { Doctor } from 'src/app/models';
import { DoctorService } from 'src/app/services';
import { MapCoords } from 'src/app/shared/map/map-coords.model';
import { MapComponent } from 'src/app/shared/map/map.component';
import { capitalize } from 'src/app/shared/utils/capitalize';
import { Unsubscribe } from 'src/app/shared/utils/unsubscribe';

@Component({
  selector: 'app-doctor-search',
  templateUrl: './doctor-search.component.html',
  styleUrls: ['./doctor-search.component.scss'],
})
export class DoctorSearchComponent extends Unsubscribe implements OnInit {
  constructor(
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private route: Router
  ) {
    super();
  }

  searchForm: FormGroup | undefined;
  doctors$: Observable<Doctor[]> | undefined;
  @ViewChild(MapComponent) map: MapComponent | undefined;
  public initialState: MapCoords = { lng: 50, lat: 49, zoom: 4 };

  ngOnInit(): void {
    this.loadAllDoctors();
    this.createSearchForm();
    this.getSearchFormValues();
  }

  loadAllDoctors(): void {
    this.doctors$ = this.doctorService.getAllDoctors().pipe(
      tap((doctors) => {
        this.map?.clearMarkers();
        doctors.forEach((doctor) => {
          let { lat, lng, firstName, lastName } = {
            firstName: doctor.firstName,
            lastName: doctor.lastName,
            lat: Math.random() * (41.916667 - 41.316667) + 41.316667,
            lng: Math.random() * (44.983333 - 44.383333) + 44.383333,
          };
          this.map?.setMarker(lat, lng, firstName, lastName);
        });
        this.map?.setViewCenter(this.initialState.lat, this.initialState.lng);
      })
    );
  }

  createSearchForm() {
    this.searchForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    });
  }

  getSearchFormValues() {
    this.searchForm?.valueChanges
      .pipe(debounceTime(1500), takeUntil(this.unsubscribe$))
      .subscribe(({ firstName, lastName }) => {
        if (firstName === '' && lastName === '') {
          this.loadAllDoctors();
        } else {
          const firstname = capitalize(firstName?.toLowerCase());
          const lastname = capitalize(lastName?.toLowerCase());
          this.doctors$ = this.doctorService
            .searchForDoctor(firstname, lastname)
            .pipe(
              tap((doctors) => {
                this.map?.clearMarkers();
                doctors.forEach((doctor) => {
                  let { lat, lng, firstName, lastName } = {
                    firstName: doctor.firstName,
                    lastName: doctor.lastName,
                    lat: Math.random() * (41.916667 - 41.316667) + 41.316667,
                    lng: Math.random() * (44.983333 - 44.383333) + 44.383333,
                  };
                  this.map?.setViewCenter(lat, lng);
                  this.map?.setMarker(lat, lng, firstName, lastName);
                });
              })
            );
        }
      });
  }

  doctorBook(doctor: Doctor) {
    this.route.navigate([`shell/booking/`, doctor.entityNo]);
  }
}
