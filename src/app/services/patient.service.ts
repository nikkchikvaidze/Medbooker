import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL } from '../shared';
import { Observable, from, map } from 'rxjs';
import { Patient } from '../models';
import { httpOptions } from '../shared/utils/httpoptions';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private base_url: string,
    private supabaseService: SupabaseService
  ) {}

  full_Url = `${this.base_url}patients/`;

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

  searchForPatient(firstName: string, lastName: string): Observable<Patient[]> {
    const params = new HttpParams()
      .set('firstName', `eq.${firstName}`)
      .set('lastName', `eq.${lastName}`);
    return this.http.get<Patient[]>(`${this.full_Url}`, {
      headers: httpOptions.headers,
      params,
    });
  }
}
