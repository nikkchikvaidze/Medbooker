import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { capitalize } from 'src/app/shared/utils/capitalize';
import { AppState } from '@store/states/app.state';
import { clearLoggedInUser } from '@store/actions/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  arrowIcon = faArrowRightFromBracket;
  showBtn = true;
  fullname: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.authService.getAuthState().subscribe((session) => {
      if (session?.user) {
        let firstname = session.user.user_metadata['firstName'];
        let lastname = session.user.user_metadata['lastName'];
        this.fullname = `${capitalize(firstname)} ${capitalize(lastname)}`;
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
