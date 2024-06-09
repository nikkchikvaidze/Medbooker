import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL } from '../shared';
import { Observable } from 'rxjs';
import { Patient } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      apikey: environment.SUPABASE_API_KEY,
      Authorization: `Bearer ${environment.SUPABASE_API_KEY}`,
    }),
  };

  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private base_url: string
  ) {}

  full_Url = `${this.base_url}patients/`;

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.full_Url}`);
  }

  getSinglePatient(entityNo: number): Observable<Patient> {
    const params = new HttpParams().set('entityNo', `eq.${entityNo}`);
    return this.http.get<Patient>(`${this.full_Url}`, {
      headers: this.httpOptions.headers,
      params,
    });
  }

  searchForPatient(firstName: string, lastName: string): Observable<Patient> {
    const params = new HttpParams()
      .set('firstName', `eq.${firstName}`)
      .set('lastName', `eq.${lastName}`);
    return this.http.get<Patient>(`${this.full_Url}`, {
      headers: this.httpOptions.headers,
      params,
    });
  }
}
