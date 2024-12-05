const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Biblioteca = require('./classes/Biblioteca');

const biblioteca = new Biblioteca();
console.log('Biblioteca inicializada:', biblioteca);

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true, // Permite usar require no renderer.js
      contextIsolation: false, // Necessário para ipcRenderer funcionar
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
});

// Recebe um pedido para adicionar livro e retorna os livros atualizados
ipcMain.handle('adicionarLivro', (event, livro) => {
  console.log('Livro recebido:', livro);
  biblioteca.adicionarLivro(livro);
  return biblioteca.listarLivros();
});

// Envia a lista de livros
ipcMain.handle('listarLivros', () => {
  return biblioteca.listarLivros();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
