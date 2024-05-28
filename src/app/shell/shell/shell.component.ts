import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  showAnimation = false;
  showMenuBtn = false;
  constructor(private sidebarService: NbSidebarService) {}
  toggle() {
    this.sidebarService.toggle(false);
    this.showAnimation = !this.showAnimation;
  }
  resetHiddenBtn() {
    window.innerWidth <= 576
      ? (this.showMenuBtn = true)
      : (this.showMenuBtn = false);
  }
  ngOnInit(): void {}
}
