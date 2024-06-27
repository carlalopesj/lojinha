//ProdutoService - serviço
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private localStorageKey = 'produtos';
  private produtos: Produto[] = [ //Definindo alguns produtos iniciais
    { id: 1, nome: 'Produto 1', preco: 10 },
    { id: 2, nome: 'Produto 2', preco: 20 },
    { id: 3, nome: 'Produto 3', preco: 30 }
  ];

  constructor() { //Usando o localStorage para persistência de dados
    const storedProdutos = localStorage.getItem(this.localStorageKey);
    this.produtos = storedProdutos ? JSON.parse(storedProdutos) : [];

    // Exemplo: inicializando com alguns produtos iniciais, caso não haja nenhum armazenado
    if (this.produtos.length === 0) {
      this.produtos = [
        { id: 1, nome: 'Produto 1', preco: 10 },
        { id: 2, nome: 'Produto 2', preco: 20 },
        { id: 3, nome: 'Produto 3', preco: 30 }
      ];
      this.saveProdutosToLocalStorage();
    }
  }

  getProdutos(): Produto[] {
    return this.produtos;
  }

  addProduto(produto: Produto): void { //Adiciona um novo produto
    produto.id = this.getNextId();
    this.produtos.push(produto);
    this.saveProdutosToLocalStorage();
  }

  deleteProduto(id: number): void { //Deleta um produto já existente
    this.produtos = this.produtos.filter(p => p.id !== id);
    this.saveProdutosToLocalStorage();
  }

  private getNextId(): number { //Gera o id automaticamente
    const maxId = Math.max(...this.produtos.map(p => p.id), 0);
    return maxId + 1;
  }

  private saveProdutosToLocalStorage(): void { //Salva no localStorage
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.produtos));
  }
}

export interface Produto {
  id: number;
  nome: string;
  preco: number;
}
