document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form'); // Seleciona o formulário

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Validação dos campos
    if (validateForm()) {
      // Se o formulário for válido, envia os dados
      sendFormData();
    }
  });

  // Função para validar o formulário
  function validateForm() {
    let isValid = true;

    // Validação do campo "Nome"
    const nome = document.getElementById('nome').value.trim();
    if (nome === '') {
      showError('nome', 'Por favor, insira seu nome.');
      isValid = false;
    } else {
      clearError('nome');
    }

    // Validação do campo "E-mail"
    const email = document.getElementById('email').value.trim();
    if (email === '' || !validateEmail(email)) {
      showError('email', 'Por favor, insira um e-mail válido.');
      isValid = false;
    } else {
      clearError('email');
    }

    //Validação do "Telefone"


    document.getElementById('telefone').addEventListener('input', function (e) {
      let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
      if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos
  
      let formattedValue = "";
      if (value.length > 10) { // Formato para números com 11 dígitos (celular)
          formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
      } else if (value.length > 6) { // Formato para números fixos (10 dígitos)
          formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
      } else if (value.length > 2) {
          formattedValue = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else if (value.length > 0) {
          formattedValue = `(${value}`;
      }
  
      e.target.value = formattedValue;
  });

    // Validação do campo "Descrição do Projeto"
    const descricao = document.getElementById('descricao').value.trim();
    if (descricao === '') {
      showError('descricao', 'Por favor, descreva o projeto.');
      isValid = false;
    } else {
      clearError('descricao');
    }

    return isValid;
  }

  // Função para validar e-mail
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Função para exibir mensagens de erro
  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '0.9em';
    errorElement.style.marginTop = '5px';

    // Remove mensagens de erro anteriores
    clearError(fieldId);

    // Adiciona a mensagem de erro após o campo
    field.parentNode.appendChild(errorElement);
  }

  // Função para limpar mensagens de erro
  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }

  // Função para enviar os dados do formulário via AJAX
  function sendFormData() {
    const formData = new FormData(form); // Captura os dados do formulário

    fetch('http://localhost:3000/enviar-orcamento', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Exibe mensagem de sucesso
          alert('Formulário enviado com sucesso!');
          form.reset(); // Limpa o formulário
        } else {
          // Exibe mensagem de erro
          alert('Ocorreu um erro ao enviar o formulário.');
        }
      })
      .catch((error) => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao enviar o formulário.');
      });
  }
});
//fim do script do formulário

