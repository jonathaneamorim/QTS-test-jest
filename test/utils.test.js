const utils = require('@/utils/manipulationsEvents');

test('CT01 - Login com credenciais válidas', async () => {
  expect(await utils.Login({
    email: 'teste@gmail.com',
    password: 'Teste@1234'
  })).toContain('Bem-vindo de volta,');
});

test('CT02 - Login com senha incorreta', async () => {
  expect(await utils.Login({
    email: 'teste@gmail.com',
    password: 'senhaErrada'
  })).toBe('Senha incorreta!');
});

test('CT03 - Login com e-mail não cadastrado', async () => {
  expect(await utils.Login({
    email: 'emailerrado@gmail.com',
    password: 'Teste@1234'
  })).toBe('Email não cadastrado!');
});

test('CT04 - Campos obrigatórios em branco', async () => {
  expect(await utils.Login({
    email: '',
    password: ''
  })).toBe('Email e Senha obrigatórios!');

  expect(await utils.Login({
    email: 'teste@gmail.com',
    password: ''
  })).toBe('Email e Senha obrigatórios!');

  expect(await utils.Login({
    email: '',
    password: 'Teste@1234'
  })).toBe('Email e Senha obrigatórios!');

  expect(await utils.Login({
    email: null,
    password: 'Teste@1234'
  })).toBe('Email e Senha obrigatórios!');

  expect(await utils.Login({
    email: 'teste@gmail.com',
    password: null
  })).toBe('Email e Senha obrigatórios!');

  expect(await utils.Login({
    email: null,
    password: null
  })).toBe('Email e Senha obrigatórios!');

  expect(await utils.Login({
    email: undefined,
    password: undefined
  })).toBe('Email e Senha obrigatórios!');
});

test('CT05 - Formato inválido de e-mail', async () => {
  expect(await utils.Login({
    email: 'formatoInvalido',
    password: 'Teste@1234'
  })).toBe('Insira um email válido!');
});