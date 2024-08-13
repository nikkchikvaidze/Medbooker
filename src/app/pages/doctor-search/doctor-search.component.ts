import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, debounceTime, takeUntil, tap } from 'rxjs';
import { Doctor } from 'src/app/models';
import { MapCoords } from 'src/app/shared/map/map-coords.model';
import { MapComponent } from 'src/app/shared/map/map.component';
import { Unsubscribe } from 'src/app/shared/utils/unsubscribe';
import * as DoctorSelectors from '../../store/selectors/doctor-search.selector';
import * as DoctorActions from '../../store/actions/doctor-search.actions';
import { AppState } from 'src/app/store/states/app.state';

@Component({
  selector: 'app-doctor-search',
  templateUrl: './doctor-search.component.html',
  styleUrls: ['./doctor-search.component.scss'],
})
export class DoctorSearchComponent extends Unsubscribe implements OnInit {
  constructor(private route: Router, private store: Store<AppState>) {
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
    this.getAllDoctorsList();
  }

  loadAllDoctors(): void {
    this.store.dispatch(DoctorActions.loadAllDoctors());
  }

  getAllDoctorsList(): void {
    this.doctors$ = this.store.select(DoctorSelectors.getAllDoctorsList).pipe(
      tap((doctors) => {
        this.setMarkersOnMap(doctors);
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
        if (!firstName && !lastName) {
          this.getAllDoctorsList();
        } else {
          const firstname = firstName?.toLowerCase();
          const lastname = lastName?.toLowerCase();
          this.store.dispatch(DoctorActions.clearSingleDoctor());
          this.store.dispatch(
            DoctorActions.loadSingleDoctor({
              firstName: firstname,
              lastName: lastname,
            })
          );
          this.doctors$ = this.store
            .select(DoctorSelectors.getSingleDoctor)
            .pipe(
              tap((doctors) => {
                this.setMarkersOnMap(doctors, true);
              })
            );
        }
      });
  }

  setMarkersOnMap(doctors: Doctor[], searchedDoctors: boolean = false): void {
    this.map?.clearMarkers();
    doctors.forEach((doctor) => {
      if (doctor.coords) {
        let {
          coords: { lat, lng },
          firstName,
          lastName,
        } = doctor;
        this.map?.setMarker(lat, lng, firstName, lastName);
        !searchedDoctors
          ? this.map?.setViewCenter(
              this.initialState.lat,
              this.initialState.lng,
              this.initialState.zoom
            )
          : this.map?.setViewCenter(
              doctors.length > 1 ? this.initialState.lat : lat,
              doctors.length > 1 ? this.initialState.lng : lng,
              doctors.length > 1 ? this.initialState.zoom : 4
            );
      }
    });
  }

  doctorBook(doctor: Doctor): void {
    this.route.navigate([`shell/booking/`, doctor.entityNo]);
  }
}
