//CarrinhoService - serviço
import { Injectable } from '@angular/core';
import { User, UsuarioService } from './usuario.service';
import { Produto } from './produto.service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private carrinhos: { [userId: number]: Produto[] } = {}; //Carrinho depende do usuário e de produtos

  constructor(private usuarioService: UsuarioService) {} //Um carrinho pertence à um usuário

  addToCart(userId: number, produto: Produto): void { //Adicionando ao carrinho
    if (!this.carrinhos[userId]) {
      this.carrinhos[userId] = [];
    }
    this.carrinhos[userId].push(produto);
    console.log(`Adicionado ao carrinho do usuário ${userId}:`, produto);
  }

  getItems(userId: number): Produto[] {
    return this.carrinhos[userId] || [];
  }

  clearCart(userId: number): void { //Limpa o carrinho
    this.carrinhos[userId] = [];
  }

  getTotalPrice(userId: number): number { //Calculando o preço total
    return this.carrinhos[userId]?.reduce((total, item) => total + item.preco, 0) || 0;
  }
}
