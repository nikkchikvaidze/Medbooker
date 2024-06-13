import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL } from '../shared';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Doctor } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
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

  full_Url = `${this.base_url}/doctors`;

  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.full_Url}`, this.httpOptions);
  }

  getSingleDoctor(entityNo: number): Observable<Doctor> {
    const params = new HttpParams().set('entityNo', `eq.${entityNo}`);
    return this.http.get<Doctor>(`${this.full_Url}`, {
      headers: this.httpOptions.headers,
      params,
    });
  }

  searchForDoctor(
    firstName: string | undefined,
    lastName: string | undefined
  ): Observable<Doctor[]> {
    let params = new HttpParams();
    if (firstName) params = params.set('firstName', `like.%${firstName}%`);
    if (lastName) params = params.set('lastName', `like.%${lastName}%`);
    return this.http.get<Doctor[]>(`${this.full_Url}`, {
      headers: this.httpOptions.headers,
      params,
    });
  }
}
