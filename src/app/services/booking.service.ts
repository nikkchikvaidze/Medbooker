import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL } from '../shared';
import {
  Booking,
  BookingRequest,
  BookingResponse,
  BookingStatusUpdateRequest,
} from '../models';
import { Observable, from, map } from 'rxjs';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(
    private http: HttpClient,
    private supabaseService: SupabaseService
  ) {}

  //This methods need to be updated, once bookings will be added in db

  createBooking(booking: BookingRequest): Observable<Booking> {
    // return this.http.post<Booking>(body);
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

  getBookingForEntity(
    entityNo: number,
    fromDate?: string,
    toDate?: string
  ): Observable<BookingResponse> {
    let params = new HttpParams();
    if (fromDate) params = params.set('fromDate', `eq.${fromDate}`);
    if (toDate) params = params.set('toDate', `eq.${toDate}`);
    return this.http.get<BookingResponse>(`/attendee/${entityNo}`, {
      params,
    });
  }

  updateBooking(
    bookingId: number,
    body: BookingStatusUpdateRequest
  ): Observable<Booking> {
    return this.http.put<Booking>(`${bookingId}/status`, body);
  }

  getAllBooking(): Observable<Booking[]> {
    const promise = this.supabaseService.supabase
      .from('bookings')
      .select(
        '*, doctor:doctor_entity_number (*), patient:patient_entity_number (*)'
      );
    return from(promise).pipe(
      map((response) => {
        return response.data ?? [];
      })
    );
  }
}
