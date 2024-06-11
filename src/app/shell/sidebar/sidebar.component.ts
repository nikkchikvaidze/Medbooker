import { Component, OnInit } from '@angular/core';
import { Roles } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private authService: AuthService) {}
  role = Roles;
  roleFromEntity: number | undefined;

  ngOnInit(): void {
    this.authService.getAuthState().subscribe((session) => {
      if (session?.user) {
        this.roleFromEntity = session.user.user_metadata['entityNo'];
      }
    });
  }
}
