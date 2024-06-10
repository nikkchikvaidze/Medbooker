import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BASE_URL } from '../shared';
import {
  Booking,
  BookingRequest,
  BookingResponse,
  BookingStatusUpdateRequest,
} from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
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

  full_Url = `${this.base_url}/bookings`;

  //This methods need to be updated, once bookings will be added in db

  createBooking(body: BookingRequest): Observable<Booking> {
    return this.http.post<Booking>(this.full_Url, body);
  }

  getBookingForEntity(
    entityNo: number,
    fromDate?: number,
    toDate?: number
  ): Observable<BookingResponse> {
    let params = new HttpParams();
    if (fromDate) params = params.set('fromDate', `eq.${fromDate}`);
    if (toDate) params = params.set('toDate', `eq.${toDate}`);
    return this.http.get<BookingResponse>(
      `${this.full_Url}/attendee/${entityNo}`,
      {
        headers: this.httpOptions.headers,
        params,
      }
    );
  }

  updateBooking(
    bookingId: number,
    body: BookingStatusUpdateRequest
  ): Observable<Booking> {
    return this.http.put<Booking>(`${this.full_Url}/${bookingId}/status`, body);
  }
}
