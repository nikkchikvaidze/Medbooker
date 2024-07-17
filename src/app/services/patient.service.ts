import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { CreatePatientRequest, Patient } from '../models';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(
    private http: HttpClient,
    private supabaseService: SupabaseService
  ) {}

  getAllPatients(): Observable<Patient[]> {
    const promise = this.supabaseService.supabase.from('patients').select('*');
    return from(promise).pipe(
      map((response) => {
        return response.data ?? [];
      })
    );
  }

  getSinglePatient(entityNo: number): Observable<Patient[]> {
    const promise = this.supabaseService.supabase
      .from('patients')
      .select()
      .eq('entityNo', entityNo);
    return from(promise).pipe(
      map((response) => {
        if (response.data) {
          return response.data[0];
        }
      })
    );
  }

  searchForPatient(
    firstName: string | undefined,
    lastName: string | undefined
  ): Observable<Patient[]> {
    let promise = this.supabaseService.supabase.from('patients').select('*');

    if (firstName) promise = promise.like('firstName', `%${firstName}%`);
    if (lastName) promise = promise.like('lastName', `%${lastName}%`);

    return from(promise).pipe(map((response) => response.data ?? []));
  }

  addPatient(patient: CreatePatientRequest): Observable<Patient[]> {
    const promise = this.supabaseService.supabase
      .from('patients')
      .insert([patient])
      .select();

    return from(promise).pipe(map((response) => response.data ?? []));
  }
}
