import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, Observable, takeUntil } from 'rxjs';
import { Roles } from 'src/app/models/user.model';
import { Unsubscribe } from 'src/app/shared/utils/unsubscribe';
import { AppState } from 'src/app/store/states/app.state';
import * as AuthActions from '../../store/actions/auth.action';
import * as AuthSelectors from '../../store/selectors/auth.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends Unsubscribe implements OnInit {
  role = Roles;
  loggedInUserRole$: Observable<Roles | undefined> = this.store
    .select(AuthSelectors.getLoggedInUser)
    .pipe(
      filter((response) => !!response),
      map((response) => response?.role)
    );

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.store
      .select(AuthSelectors.getLoggedInUser)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        if (!response) {
          this.store.dispatch(AuthActions.getLoggedInUser());
        }
      });
  }
}
