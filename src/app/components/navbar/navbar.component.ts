import { Component, OnInit } from '@angular/core';
import { AuthData } from '../../auth/auth.data';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  user!: AuthData | null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((_user: AuthData | null) => {
      this.user = _user;
    });
  }

  logout() {
    this.authService.logout();
  }
}
