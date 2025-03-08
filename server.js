const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Configura o multer para processar o upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pasta onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nome único para o arquivo
  },
});

const upload = multer({ storage });

// Cria a pasta "uploads" se não existir
const fs = require('fs');
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Rota para receber os dados do formulário
app.post('/enviar-orcamento', upload.single('design'), (req, res) => {
  // Captura todos os campos do formulário
  const {
    nome,
    email,
    telefone,
    empresa,
    'tipo-projeto': tipoProjeto,
    descricao,
    prazo,
    orcamento,
    plataforma,
    observacoes,
    'como-conheceu': comoConheceu,
  } = req.body;

  // Captura o arquivo enviado (se houver)
  const designFile = req.file;

  // Exibe os dados no console
  console.log('Dados recebidos:');
  console.log('Nome:', nome);
  console.log('E-mail:', email);
  console.log('Telefone:', telefone);
  console.log('Empresa:', empresa);
  console.log('Tipo de Projeto:', tipoProjeto);
  console.log('Descrição:', descricao);
  console.log('Prazo:', prazo);
  console.log('Orçamento Previsto:', orcamento);
  console.log('Plataforma Preferida:', plataforma);
  console.log('Outras Observações:', observacoes);
  console.log('Como Conheceu:', comoConheceu);

  if (designFile) {
    console.log('Arquivo de Design Recebido:', designFile.filename);
  } else {
    console.log('Nenhum arquivo de design foi enviado.');
  }

  // Resposta para o frontend
  res.json({ success: true, message: 'Formulário recebido com sucesso!' });
});





// Inicia o servidor na porta 3000
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`A porta ${PORT} já está em uso.`);
  } else {
    console.error('Erro ao iniciar o servidor:', err);
  }
});