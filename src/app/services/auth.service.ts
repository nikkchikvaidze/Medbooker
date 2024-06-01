import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import {
  AuthChangeEvent,
  AuthError,
  AuthResponse,
  AuthTokenResponsePassword,
  Session,
  SupabaseClient,
} from '@supabase/supabase-js';
import { BehaviorSubject, Observable, from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabase: SupabaseClient;
  private authState = new BehaviorSubject<Session | null>(null);

  constructor(private supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.getSupabase();
    this.supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        this.authState.next(session);
      }
    );
  }

  public getAuthState(): Observable<Session | null> {
    return this.authState.asObservable();
  }

  public signUp(
    email: string,
    password: string
  ): Observable<AuthResponse | AuthError | null> {
    return from(this.supabase.auth.signUp({ email, password }));
  }

  public signIn(
    email: string,
    password: string
  ): Observable<AuthTokenResponsePassword | AuthError | null> {
    return from(this.supabase.auth.signInWithPassword({ email, password }));
  }

  public signOut(): Observable<{
    error: AuthError | null;
  }> {
    return from(this.supabase.auth.signOut());
  }
}
