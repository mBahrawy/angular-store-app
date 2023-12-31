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
  role$!: BehaviorSubject<UserRole | null>;

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
    this.role$ = new BehaviorSubject<UserRole | null>(this.getRole());
  }


  isAdmin(): boolean {
    return this.role$.value === UserRole.ADMIN;
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

    const currentUserRole = this.getUserRole(username);

    this.isAuth$.next(true);
    this.role$.next(currentUserRole);
    this.setToken('TOKEN');
    currentUserRole && this.setRole(currentUserRole);

    this.redirectUser();
    return { success: true, userRole: currentUserRole };
  }

  redirectUser(): void {
    if (!this.role$.value || !this.getToken()) return;
    this.role$.value === UserRole.USER && this.router.navigate(['/store']);
    this.role$.value === UserRole.ADMIN && this.router.navigate(['/admin']);
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
    this.router.navigate(['/auth']);
  }
}
