const utils = require('../src/utils/validations');

test('Teste de email inválido', () => {
  expect(utils.isValidEmail('a@a')).toBe(false);
});

test('Teste de senha válido', () => {
  expect(utils.isStrongPassword('AadaA@#324')).toBe(true);
});



// test('Teste de email válido', () => {
//   expect(validations.isValidEmail('a@a')).toBe(true);
// });