import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { UsuarioService, User } from '../../services/usuario.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  items: any[] = []; //Lista d eitens no carrinho
  totalPrice: number = 0; //Preço total
  @Input() selectedUser: User | undefined; //Usuário selecionado com entrada

  constructor(
    private cartService: CarrinhoService,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.selectedUser = this.usuarioService.getSelectedUser(); //Obtém o usuário selecionado
    if (this.selectedUser) {
      this.items = this.cartService.getItems(this.selectedUser.id); //Obtém os itens do carrinho do usuário
      this.calculateTotalPrice(); //Calcula o preço total dos itens no carrinho
    }
  }

  clearCart() {
    if (this.selectedUser) {
      this.cartService.clearCart(this.selectedUser.id);
      this.items = []; //Limpa a lista localmente
      this.totalPrice = 0; //Reinicia o preço
      this.router.navigate(['/']); //Vai para a página inicial
    }
  }

  private calculateTotalPrice() {
    if (this.selectedUser) {
      this.totalPrice = this.cartService.getTotalPrice(this.selectedUser.id);
    }
  }
}
