import { Injectable } from '@angular/core';
import { Booking, BookingRequest, Roles, Status } from '../models';
import { Observable, from, map, switchMap } from 'rxjs';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private supabaseService: SupabaseService) {}

  createBooking(booking: BookingRequest): Observable<Booking> {
    const promise = this.supabaseService.supabase
      .from('bookings')
      .insert([booking])
      .select()
      .single();
    return from(promise).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  getBookingsForEntity(entityNo: string, role: number): Observable<Booking[]> {
    const promise = this.supabaseService.supabase
      .from('bookings')
      .select('*, doctor:doctorEntityNo (*), patient:patientEntityNo (*)')
      .eq(
        role === Roles.Doctor ? 'doctorEntityNo' : 'patientEntityNo',
        entityNo
      );

    return from(promise).pipe(
      map((response) => {
        return response.data || [];
      })
    );
  }

  updateBooking(
    bookingId: number,
    status: Status,
    role: Roles,
    entityNo: string
  ): Observable<any> {
    const promise = this.supabaseService.supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId)
      .select();
    return from(promise).pipe(
      switchMap(() =>
        from(
          this.supabaseService.supabase
            .from('bookings')
            .select('*')
            .eq(
              role === Roles.Doctor ? 'doctorEntityNo' : 'patientEntityNo',
              entityNo
            )
        )
      ),
      map((response) => {
        return response.data;
      })
    );
  }

  getAllBooking(): Observable<Booking[]> {
    const promise = this.supabaseService.supabase
      .from('bookings')
      .select('*, doctor:doctorEntityNo (*), patient:patientEntityNo (*)');
    return from(promise).pipe(
      map((response) => {
        return response.data ?? [];
      })
    );
  }
}
