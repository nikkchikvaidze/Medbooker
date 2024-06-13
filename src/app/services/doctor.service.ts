import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL } from '../shared';
import { Observable } from 'rxjs';
import { Doctor } from '../models';
import { httpOptions } from '../shared/utils/httpoptions';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private base_url: string
  ) {}

  full_Url = `${this.base_url}/doctors`;

  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.full_Url}`, httpOptions);
  }

  getSingleDoctor(entityNo: number): Observable<Doctor> {
    const params = new HttpParams().set('entityNo', `eq.${entityNo}`);
    return this.http.get<Doctor>(`${this.full_Url}`, {
      headers: httpOptions.headers,
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
      headers: httpOptions.headers,
      params,
    });
  }
}
