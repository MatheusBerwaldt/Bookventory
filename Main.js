const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Biblioteca = require('./classes/Biblioteca'); // Ajuste o caminho conforme necessário

const biblioteca = new Biblioteca();

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
});

ipcMain.handle('adicionarLivro', async (_, livro) => {
  return await biblioteca.adicionarLivro(livro);
});

ipcMain.handle('listarLivros', async () => {
  return await biblioteca.listarLivros();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
