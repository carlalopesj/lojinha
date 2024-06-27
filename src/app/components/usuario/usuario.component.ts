//UsuarioComponent - componente
import { Component, Output, EventEmitter } from '@angular/core';
import { UsuarioService, User } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  users: User[] = []; //Definindo o usuário
  selectedUser: User | undefined; //Retorna o usuário selecionado
  newUser: User = { id: 0, name: '', cart: [] }; //Deve conter nome e id, e uma referência ao carrinho

  @Output() userSelected = new EventEmitter<User>(); //Evento para emitir quando um usuário é selecionado - outros componentes possam reagir a ele

  constructor(private userService: UsuarioService) {
    //Inicialização no construtor: carrega usuários e usuário selecionado do serviço
    this.users = this.userService.getUsers();
    this.selectedUser = this.userService.getSelectedUser();
  }

  selectUser(user: User): void {
    this.userService.selectUser(user);
    this.userSelected.emit(user);
    this.selectedUser = user;
  }

  addUser(): void {
    if (this.newUser.name.trim() !== '') {  //Verifica se o nome do novo usuário não está vazio
      this.userService.addUser({ ...this.newUser });
      this.users = this.userService.getUsers();
      this.newUser = { id: 0, name: '', cart: [] }; //Limpa o 'formulário'
    }


  }
}
