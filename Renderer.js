const { ipcRenderer } = require('electron');

// Adicionar livro
document.getElementById('form-adicionar-livro').addEventListener('submit', async (event) => {
  event.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const autor = document.getElementById('autor').value;

  // Envia os dados do livro para o processo principal
  const livrosAtualizados = await ipcRenderer.invoke('adicionarLivro', { titulo, autor });
  console.log('Livros atualizados:', livrosAtualizados);

  // Limpa os campos do formulário
  document.getElementById('form-adicionar-livro').reset();
});

// Listar livros
document.getElementById('listar-livros').addEventListener('click', async () => {
  const livros = await ipcRenderer.invoke('listarLivros');
  const tabela = document.getElementById('tabela-livros');

  tabela.innerHTML = ''; // Limpa a tabela
  livros.forEach((livro) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${livro.titulo}</td><td>${livro.autor}</td>`;
    tabela.appendChild(row);
  });
});
