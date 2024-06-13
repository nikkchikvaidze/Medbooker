import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
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
  constructor(private doctorService: DoctorService, private fb: FormBuilder) {}

  searchInput = new FormControl();
  doctors$: Observable<Doctor[]> | undefined;

  ngOnInit(): void {
    this.loadAllDoctors();

    this.searchInput.valueChanges.pipe(
      debounceTime(1000),
      switchMap((value) => {
        const [firstName, lastName] = value.toLowerCase().trim().split(' ');
        return this.doctorService.searchForDoctor(
          capitalize(firstName),
          capitalize(lastName)
        );
      })
    );
  }

  loadAllDoctors(): void {
    this.doctors$ = this.doctorService.getAllDoctors();
  }
}
