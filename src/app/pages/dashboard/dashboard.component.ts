import { Component, OnInit } from '@angular/core';
import { Roles } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  role = Roles;
  roleFromEntity: number | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAuthState().subscribe((session) => {
      if (session?.user) {
        this.roleFromEntity = session.user.user_metadata['entityNo'];
      }
    });
  }
}
