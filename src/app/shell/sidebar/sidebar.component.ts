import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/states/app.state';
import { Observable } from 'rxjs';
import { Roles } from 'src/app/models/user.model';
import { getLoggedInUserRole } from '@store/selectors/auth.selector';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  role = Roles;
  loggedInUserRole$: Observable<number | undefined> =
    this.store.select(getLoggedInUserRole);

  constructor(private store: Store<AppState>) {}
}
