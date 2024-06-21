import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Roles } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services';
import { Unsubscribe } from 'src/app/shared/utils/unsubscribe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends Unsubscribe implements OnInit {
  role = Roles;
  roleFromEntity: number | undefined;

  constructor(private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.authService
      .getAuthState()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((session) => {
        if (session?.user) {
          this.roleFromEntity = session.user.user_metadata['entityNo'];
        }
      });
  }
}
