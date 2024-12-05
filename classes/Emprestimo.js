class Emprestimo {
    constructor(id, livro, usuario, dataEmprestimo, dataDevolucao) {
      this.id = id;
      this.livro = livro;
      this.usuario = usuario;
      this.dataEmprestimo = dataEmprestimo;
      this.dataDevolucao = dataDevolucao;
    }
  
    isAtrasado() {
      const hoje = new Date();
      return this.dataDevolucao && hoje > new Date(this.dataDevolucao);
    }
  }
  