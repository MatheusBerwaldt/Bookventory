const { ipcRenderer } = require('electron');

// Adicionar livro
document.getElementById('form-adicionar-livro').addEventListener('submit', async (event) => {
  event.preventDefault();

  const id = Date.now();
  const titulo = document.getElementById('titulo').value;
  const autor = document.getElementById('autor').value;
  const genero = document.getElementById('genero').value;
  const anoPublicacao = document.getElementById('anoPublicacao').value;

  const livro = { id, titulo, autor, genero, anoPublicacao };

  try {
    const livrosAtualizados = await ipcRenderer.invoke('adicionarLivro', livro);
    console.log('Livros atualizados:', livrosAtualizados);
    document.getElementById('form-adicionar-livro').reset();
  } catch (err) {
    console.error('Erro ao adicionar livro:', err.message);
  }
});

// Listar livros
document.getElementById('listar-livros').addEventListener('click', async () => {
  try {
    const livros = await ipcRenderer.invoke('listarLivros');
    const tabela = document.getElementById('tabela-livros');

    tabela.innerHTML = '';
    livros.forEach((livro) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${livro.titulo}</td>
        <td>${livro.autor}</td>
        <td>${livro.genero || '-'}</td>
        <td>${livro.anoPublicacao || '-'}</td>
      `;
      tabela.appendChild(row);
    });
  } catch (err) {
    console.error('Erro ao listar livros:', err.message);
  }
});
