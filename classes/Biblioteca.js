const Database = require('./Database'); // Caminho correto para Database.js

class Biblioteca {
  constructor() {
    this.db = new Database(); // Certifique-se de que Database é uma classe
  }

  async adicionarLivro(livro) {
    try {
      return await this.db.inserirLivro(livro);
    } catch (err) {
      console.error('Erro ao adicionar livro na classe Biblioteca:', err.message);
      throw err;
    }
  }

  async listarLivros() {
    try {
      return await this.db.listarLivros();
    } catch (err) {
      console.error('Erro ao listar livros na classe Biblioteca:', err.message);
      throw err;
    }
  }
}
console.log('Database importado:', Database); // Deve mostrar a definição da classe Database

module.exports = Biblioteca;
