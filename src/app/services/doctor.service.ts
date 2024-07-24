import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { Doctor, CreateDoctorRequest } from '../models';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private supabaseService: SupabaseService) {}

  getAllDoctors(): Observable<Doctor[]> {
    const promise = this.supabaseService.supabase.from('doctors').select('*');
    return from(promise).pipe(
      map((response) => {
        return response.data ?? [];
      })
    );
  }

  getSingleDoctor(entityNo: string): Observable<Doctor> {
    const promise = this.supabaseService.supabase
      .from('doctors')
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

  searchForDoctor(
    firstName: string | undefined,
    lastName: string | undefined
  ): Observable<Doctor[]> {
    let promise = this.supabaseService.supabase.from('doctors').select('*');

    if (firstName) promise = promise.like('firstName', `%${firstName}%`);
    if (lastName) promise = promise.like('lastName', `%${lastName}%`);

    return from(promise).pipe(map((response) => response.data ?? []));
  }

  addDoctor(doctor: CreateDoctorRequest): Observable<Doctor[]> {
    const promise = this.supabaseService.supabase
      .from('doctors')
      .insert([doctor])
      .select();

    return from(promise).pipe(map((response) => response.data ?? []));
  }
}
