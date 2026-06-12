import { Injectable, signal } from '@angular/core';
import {User} from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly STORAGE_KEY = 'auth-service';
  currentUser = signal<User | null>(this.getInitialUser());

  private getInitialUser(): User | null {
    const userJson = sessionStorage.getItem('current_user');
    return userJson ? JSON.parse(userJson) : null;
  }

  constructor() {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
    }
  }

  getUsers(): User[] {
    const usersJson = localStorage.getItem(this.STORAGE_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  createUser(newUser: User): { success: boolean; message: string } {
    const users = this.getUsers();

    const emailExists = users.some((user) => user.email === newUser.email);
    if (emailExists) {
      return { success: false, message: 'Cette adresse mail est déjà utilisée.' };
    }

    const nameExists = users.some((user) => user.name === newUser.name);
    if (nameExists) {
      return { success: false, message: "Le nom d'utilisateur est déjà utilisé" };
    }

    users.push(newUser);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    return { success: true, message: 'Inscription réussie !' };
  }

  loginUser(email: string, password: string): { success: boolean; user?: User } {
    const users = this.getUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (user && user.password && user.password === password) {
      const { password, ...userWithoutPassword } = user;
      sessionStorage.setItem('current_user', JSON.stringify(userWithoutPassword));
      this.currentUser.set(userWithoutPassword);
      return { success: true, user: userWithoutPassword };
    }

    return { success: false };
  }

  public logout(): void {
    sessionStorage.removeItem('current_user');
    this.currentUser.set(null);
  }
}
