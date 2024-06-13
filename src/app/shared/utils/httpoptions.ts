import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    apikey: environment.SUPABASE_API_KEY,
    Authorization: `Bearer ${environment.SUPABASE_API_KEY}`,
  }),
};
