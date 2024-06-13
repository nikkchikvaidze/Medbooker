import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL } from '../shared';
import {
  Booking,
  BookingRequest,
  BookingResponse,
  BookingStatusUpdateRequest,
} from '../models';
import { Observable } from 'rxjs';
import { httpOptions } from '../shared/utils/httpoptions';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
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
    fromDate?: string,
    toDate?: string
  ): Observable<BookingResponse> {
    let params = new HttpParams();
    if (fromDate) params = params.set('fromDate', `eq.${fromDate}`);
    if (toDate) params = params.set('toDate', `eq.${toDate}`);
    return this.http.get<BookingResponse>(
      `${this.full_Url}/attendee/${entityNo}`,
      {
        headers: httpOptions.headers,
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
