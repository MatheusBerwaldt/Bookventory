const { contextBridge, ipcRenderer } = require('electron');

// Exponha métodos seguros para o frontend
contextBridge.exposeInMainWorld('api', {
  adicionarLivro: (livro) => ipcRenderer.invoke('adicionarLivro', livro),
  listarLivros: () => ipcRenderer.invoke('listarLivros'),
});
