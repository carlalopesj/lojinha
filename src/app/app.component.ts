import { Component } from '@angular/core';
import { UsuarioService, User } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lojinha';
  selectedUser: User | undefined; //Usuário

  constructor(private usuarioService: UsuarioService) { //Injeção de Dependência
    this.selectedUser = this.usuarioService.getSelectedUser();
  }

  onUserSelected(user: User): void { //Usuário selecionado para realizar as ações
    this.usuarioService.selectUser(user);
    this.selectedUser = user;
    console.log('Usuário selecionado:', user);
  }
}