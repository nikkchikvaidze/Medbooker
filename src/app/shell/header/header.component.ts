import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { capitalize } from 'src/app/shared/utils/capitalize';
import { AppState } from '@store/states/app.state';
import { clearLoggedInUser } from '@store/actions/auth.action';
import * as AuthSelectors from '@store/selectors/auth.selector';
import { takeUntil } from 'rxjs';
import { Unsubscribe } from 'src/app/shared/utils/unsubscribe';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends Unsubscribe implements OnInit {
  arrowIcon = faArrowRightFromBracket;
  showBtn = true;
  fullname: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.getFullName();
  }

  getFullName(): void {
    this.store
      .select(AuthSelectors.getLoggedInUser)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((loggedInUser) => {
        if (loggedInUser) {
          this.fullname = `${capitalize(loggedInUser.firstName)} ${capitalize(
            loggedInUser.lastName
          )}`;
        }
      });
  }

  resetHiddenBtn() {
    window.innerWidth <= 576 ? (this.showBtn = false) : (this.showBtn = true);
  }

  signoutUser() {
    this.authService.signOut().subscribe((_) => {
      this.store.dispatch(clearLoggedInUser());
      this.router.navigate(['/login']);
    });
  }
}
