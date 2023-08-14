import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  handleHoToHome() {
    this.auth.getToken()
      ? this.auth.redirectUser()
      : this.router.navigate(['/auth']);
  }
}
