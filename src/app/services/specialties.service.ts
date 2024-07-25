import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { from, map, Observable } from 'rxjs';
import { Specialty } from '../models/specialty.model';

@Injectable({
  providedIn: 'root',
})
export class SpecialtiesService {
  constructor(private supabaseService: SupabaseService) {}

  getSpecialties(): Observable<Specialty[]> {
    const promise = this.supabaseService.supabase
      .from('specialties')
      .select('*')
      .order('type', { ascending: true });
    return from(promise).pipe(
      map((response) => {
        return response.data ?? [];
      })
    );
  }
}
