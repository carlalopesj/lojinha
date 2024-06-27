//UsuarioService - serviço
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private users: User[] = [ //Definindo alguns users
    { id: 1, name: 'Maria', cart: [] },
    { id: 2, name: 'Duda', cart: [] }
  ];

  private selectedUser: User | undefined; //Seleciona um para realizar alguma ação

  constructor() {
    //Carrega dados do localStorage, ou adiciona novos
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User): void { //Adiciona um usuário
    user.id = this.getNextId();
    this.users.push(user);
    this.saveUsersToLocalStorage();
  }

  getUserById(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }

  selectUser(user: User): void {
    this.selectedUser = user;
  }

  getSelectedUser(): User | undefined {
    return this.selectedUser;
  }

  private getNextId(): number { //Define o id automático
    const maxId = Math.max(...this.users.map(u => u.id), 0);
    return maxId + 1;
  }

  private saveUsersToLocalStorage(): void { //Método para salvar no localStorage
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}

export interface User {
  id: number;
  name: string;
  cart: any[];
}
