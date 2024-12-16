const fs = require('fs');

class Persistencia {
  static salvarDados(arquivo, dados) {
    fs.writeFileSync(arquivo, JSON.stringify(dados, null, 2));
  }

  static carregarDados(arquivo) {
    if (fs.existsSync(arquivo)) {
      return JSON.parse(fs.readFileSync(arquivo));
    }
    return null;
  }
}
