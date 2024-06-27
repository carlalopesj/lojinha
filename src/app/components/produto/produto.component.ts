import { Component } from '@angular/core';
import { ProdutoService, Produto } from '../../services/produto.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { UsuarioService, User } from '../../services/usuario.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent {
  produto: Produto = { id: 0, nome: '', preco: 0 }; //Objeto para manipular dados de produtos
  produtos: Produto[] = [];
  selectedUser: User | undefined;
  mensagem: string = ''; //Mensagem temporária de feedback ao usuário

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private usuarioService: UsuarioService
  ) {
    //Inicializa produtos e usuário selecionado ao criar o componente
    this.produtos = this.produtoService.getProdutos();
    this.selectedUser = this.usuarioService.getSelectedUser();
  }

  addProduto(): void {
    this.produtoService.addProduto({ ...this.produto });
    this.produtos = this.produtoService.getProdutos(); //Atualiza a lista de produtos
    this.produto = { id: 0, nome: '', preco: 0 }; // Limpa o formulário após adicionar
  }

  //Método para adicionar um produto ao carrinho do usuário selecionado
  adicionarAoCarrinho(produto: Produto): void {
    this.selectedUser = this.usuarioService.getSelectedUser();
    if (this.selectedUser) {
      this.carrinhoService.addToCart(this.selectedUser.id, produto);
      this.mensagem = `Produto "${produto.nome}" adicionado ao carrinho de ${this.selectedUser.name}!`;
      setTimeout(() => {
        this.mensagem = '';
      }, 3000); //Mensagem desaparece após 3 segundos
    } else {
      this.mensagem = 'Nenhum usuário selecionado!';
      setTimeout(() => {
        this.mensagem = '';
      }, 3000);
    }
  }

  deleteProduto(id: number): void {
    this.produtoService.deleteProduto(id);
    this.produtos = this.produtoService.getProdutos(); //Atualiza a lista de produtos após deletar
  }
}
