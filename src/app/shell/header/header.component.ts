import { Component, OnInit } from '@angular/core';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  arrowIcon = faArrowRightFromBracket;
  showBtn = true;

  constructor() {}

  ngOnInit(): void {}

  resetHiddenBtn() {
    window.innerWidth <= 576 ? (this.showBtn = false) : (this.showBtn = true);
  }
}
