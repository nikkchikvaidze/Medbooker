import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { capitalize } from 'src/app/shared/utils/capitalize';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  arrowIcon = faArrowRightFromBracket;
  showBtn = true;
  fullname: string = '';

  constructor(private authService: AuthService, private router: Router) {}

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
      this.router.navigate(['/login']);
    });
  }
}
