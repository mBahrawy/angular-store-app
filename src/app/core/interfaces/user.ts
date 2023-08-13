export interface User {
  username: string;
  password: string;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
