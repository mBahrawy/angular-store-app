import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocalizationService } from 'src/app/core/services/localization.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isSmallScreen = false;
  isLoggedIn = false; // Set this based on your authentication state

  constructor(
    public auth: AuthService,
    private breakpointObserver: BreakpointObserver,
    public translate: TranslateService,
    public localizService: LocalizationService
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.Handset])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });
  }

  toggleSidenav(): void {
    // if (this.isSmallScreen) {
    //   this.sidenav.toggle();
    // }
  }

  logout(): void {
    this.auth.logout();
  }
}
