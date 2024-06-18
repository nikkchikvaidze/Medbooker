import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import {
  AuthChangeEvent,
  AuthError,
  AuthResponse,
  AuthTokenResponsePassword,
  Session,
  SupabaseClient,
  UserMetadata,
} from '@supabase/supabase-js';
import { BehaviorSubject, Observable, from, map } from 'rxjs';
import { User } from '../models/user.model';

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

  public getUser(): Observable<UserMetadata | undefined> {
    return from(this.supabase.auth.getUser()).pipe(
      map((data) => data.data.user?.user_metadata)
    );
  }

  public signUp(
    email: string,
    password: string,
    data: User
  ): Observable<AuthResponse | null> {
    return from(
      this.supabase.auth.signUp({ email, password, options: { data } })
    );
  }

  public signIn(
    email: string,
    password: string
  ): Observable<AuthTokenResponsePassword | null> {
    return from(this.supabase.auth.signInWithPassword({ email, password }));
  }

  public signOut(): Observable<{
    error: AuthError | null;
  }> {
    return from(this.supabase.auth.signOut());
  }
}
