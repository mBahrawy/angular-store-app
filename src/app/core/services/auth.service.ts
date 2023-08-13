import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth$!: BehaviorSubject<boolean>;

  private users: User[] = [
    {
      username: 'user',
      password: 'user',
    },
    {
      username: 'admin',
      password: 'admin',
    },
  ];

  constructor(private toastr: ToastrService, private router: Router) {
    this.isAuth$ = new BehaviorSubject<boolean>(!!this.getToken());
  }

  getUser(username: string): User | null {
    return this.users.find((user) => user.username === username) || null;
  }

  login(username: string, password: string): boolean {
    if (!this.getUser(username)) {
      this.toastr.error('User was not found');
      return false;
    }

    if (this.getUser(username)?.password !== password) {
      this.toastr.error('Username or password is incorrect');
      return false;
    }

    this.isAuth$.next(true);
    this.setToken('TOKEN');
    return true;
  }

  setToken(t: string): void {
    localStorage.setItem('token', t);
  }

  getToken(): string | null {
    return localStorage.getItem('token') || null;
  }

  removeToken(): void {
     localStorage.removeItem('token');
  }

  logout(): void {
    this.removeToken();
    this.isAuth$.next(false);
    this.router.navigate(['/login']);
  }
}
