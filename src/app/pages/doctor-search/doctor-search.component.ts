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
  public initialState: MapCoords = { lng: 50, lat: 49, zoom: 2 };

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
          if (doctor.coords) {
            let {
              coords: { lat, lng },
              firstName,
              lastName,
            } = doctor;
            this.map?.setMarker(lat, lng, firstName, lastName);
          }
        });
        this.map?.setViewCenter(
          this.initialState.lat,
          this.initialState.lng,
          this.initialState.zoom
        );
      })
    );
  }

  createSearchForm(): void {
    this.searchForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    });
  }

  getSearchFormValues(): void {
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
                  if (doctor.coords) {
                    let {
                      coords: { lat, lng },
                      firstName,
                      lastName,
                    } = doctor;
                    this.map?.setViewCenter(lat, lng, 4);
                    this.map?.setMarker(lat, lng, firstName, lastName);
                  }
                });
              })
            );
        }
      });
  }

  doctorBook(doctor: Doctor): void {
    this.route.navigate([`shell/booking/`, doctor.entityNo]);
  }
}
