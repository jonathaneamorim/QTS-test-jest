const utils = require('@/utils/manipulationsEvents');

test('CT01 - Login com credenciais válidas', async () => {
  await expect(utils.login({
    email: 'teste@gmail.com',
    password: 'Teste@1234'
  })).resolves.not.toThrow();
});

test('CT02 - Login com senha incorreta', async () => {
  await expect(utils.login({
    email: 'teste@gmail.com',
    password: 'senhaErrada'
  })).rejects.toThrow('Senha incorreta!');
});

test('CT03 - Login com e-mail não cadastrado', async () => {
  await expect(utils.login({
    email: 'emailerrado@gmail.com',
    password: 'Teste@1234'
  })).rejects.toThrow('Email não cadastrado!');
});

test('CT04 - Campos obrigatórios em branco', async () => {
  await expect(utils.login({
    email: '',
    password: ''
  })).rejects.toThrow('Email e Senha obrigatórios!');

  await expect(utils.login({
    email: 'teste@gmail.com',
    password: ''
  })).rejects.toThrow('Email e Senha obrigatórios!');

  await expect(utils.login({
    email: '',
    password: 'Teste@1234'
  })).rejects.toThrow('Email e Senha obrigatórios!');

  await expect(utils.login({
    email: null,
    password: 'Teste@1234'
  })).rejects.toThrow('Email e Senha obrigatórios!');

  await expect(utils.login({
    email: 'teste@gmail.com',
    password: null
  })).rejects.toThrow('Email e Senha obrigatórios!');

  await expect(utils.login({
    email: null,
    password: null
  })).rejects.toThrow('Email e Senha obrigatórios!');

  await expect(utils.login({
    email: undefined,
    password: undefined
  })).rejects.toThrow('Email e Senha obrigatórios!');
});

test('CT05 - Formato inválido de e-mail', async () => {
  await expect(utils.login({
    email: 'formatoInvalido',
    password: 'Teste@1234'
  })).rejects.toThrow('Insira um email válido!');
});