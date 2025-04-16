const utils = require('@/utils/manipulationsEvents');

test('CT01 - Login com credenciais válidas', async () => {
  await expect(utils.login({
    email: 'teste@gmail.com',
    password: 'Teste@1234'
  })).resolves;
});

test('CT02 - Login com senha incorreta', async () => {
  await expect(utils.login({
    email: 'teste@gmail.com',
    password: 'senhaErrada'
  })).rejects.toThrow(new Error('Senha incorreta!'));
});

test('CT03 - Login com e-mail não cadastrado', async () => {
  await expect(utils.login({
    email: 'emailerrado@gmail.com',
    password: 'Teste@1234'
  })).rejects.toThrow(new Error('Email não cadastrado!'));
});

test('CT04 - Campos obrigatórios em branco', async () => {
  await expect(utils.login({
    email: '',
    password: ''
  })).rejects.toThrow(new Error('Email e Senha obrigatórios!'));

  await expect(utils.login({
    email: 'teste@gmail.com',
    password: ''
  })).rejects.toThrow(new Error('Email e Senha obrigatórios!'));

  await expect(utils.login({
    email: '',
    password: 'Teste@1234'
  })).rejects.toThrow(new Error('Email e Senha obrigatórios!'));

  await expect(utils.login({
    email: null,
    password: 'Teste@1234'
  })).rejects.toThrow(new Error('Email e Senha obrigatórios!'));

  await expect(utils.login({
    email: 'teste@gmail.com',
    password: null
  })).rejects.toThrow(new Error('Email e Senha obrigatórios!'));

  await expect(utils.login({
    email: null,
    password: null
  })).rejects.toThrow(new Error('Email e Senha obrigatórios!'));

  await expect(utils.login({
    email: undefined,
    password: undefined
  })).rejects.toThrow(new Error('Email e Senha obrigatórios!'));
});

test('CT05 - Formato inválido de e-mail', async () => {
  await expect(utils.login({
    email: 'formatoInvalido',
    password: 'Teste@1234'
  })).rejects.toThrow(new Error('Insira um email válido!'));
});