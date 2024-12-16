const sqlite3 = require('sqlite3').verbose();

class Database {
  constructor() {
    this.db = new sqlite3.Database('biblioteca.db', (err) => {
      if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
      } else {
        console.log('Conectado ao banco de dados SQLite.');
        this.criarTabela();
      }
    });
  }

  criarTabela() {
    const query = `
      CREATE TABLE IF NOT EXISTS livros (
        id INTEGER PRIMARY KEY,
        titulo TEXT NOT NULL,
        autor TEXT NOT NULL,
        genero TEXT,
        anoPublicacao INTEGER
      )
    `;
    this.db.run(query, (err) => {
      if (err) {
        console.error('Erro ao criar tabela de livros:', err.message);
      } else {
        console.log('Tabela "livros" criada ou já existente.');
      }
    });
  }

  inserirLivro(livro) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO livros (id, titulo, autor, genero, anoPublicacao)
        VALUES (?, ?, ?, ?, ?)
      `;
      this.db.run(
        query,
        [livro.id, livro.titulo, livro.autor, livro.genero, livro.anoPublicacao],
        function (err) {
          if (err) {
            console.error('Erro ao inserir livro:', err.message);
            reject(err);
          } else {
            resolve({ id: livro.id, ...livro });
          }
        }
      );
    });
  }

  listarLivros() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM livros`;
      this.db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}
console.log('Database importado:', Database); // Deve mostrar a definição da classe Database

module.exports = Database;
