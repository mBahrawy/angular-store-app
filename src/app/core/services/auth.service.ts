import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { User, UserRole } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth$!: BehaviorSubject<boolean>;
  private currentUser!: User | null;
  private currentUserRole!: UserRole | null;
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
    // Initialize auth state
    this.isAuth$ = new BehaviorSubject<boolean>(!!this.getToken());
    this.getRole() && (this.currentUserRole = this.getRole());
  }

  getUserRole(username: string): UserRole | null {
    if (username.includes(UserRole.ADMIN)) return UserRole.ADMIN;
    if (username.includes(UserRole.USER)) return UserRole.USER;
    return null;
  }

  getUser(username: string): User | null {
    return this.users.find((user) => user.username === username) || null;
  }

  login(
    username: string,
    password: string
  ): { success: boolean; userRole?: UserRole | null } {
    if (!this.getUser(username)) {
      this.toastr.error('User was not found');
      return { success: false };
    }

    if (this.getUser(username)?.password !== password) {
      this.toastr.error('Username or password is incorrect');
      return { success: false };
    }

    this.currentUserRole = this.getUserRole(username);

    this.isAuth$.next(true);
    this.currentUser = this.getUser(username);
    this.setToken('TOKEN');
    this.currentUserRole && this.setRole(this.currentUserRole);

    this.userRedirect();
    return { success: true, userRole: this.currentUserRole };
  }

  userRedirect(): void {
    if (!this.currentUserRole || !this.getToken()) return;
    this.currentUserRole === UserRole.USER && this.router.navigate(['/user']);
    this.currentUserRole === UserRole.ADMIN && this.router.navigate(['/admin']);
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

  setRole(r: UserRole): void {
    localStorage.setItem('role', r);
  }

  getRole(): UserRole | null {
    return (localStorage.getItem('role') as UserRole) || null;
  }

  removeRole(): void {
    localStorage.removeItem('role');
  }

  logout(): void {
    // Remove token and role from local storage
    this.removeToken();
    this.removeRole();
    this.isAuth$.next(false);
    this.router.navigate(['/login']);
  }
}
