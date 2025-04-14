const validations = require('../src/utils/validations');

test('Teste de email inválido', () => {
  expect(validations.isValidEmail('a@a')).toBe(false);
});

test('Teste de senha válido', () => {
  expect(validations.isStrongPassword('AadaA@#324')).toBe(true);
});



// test('Teste de email válido', () => {
//   expect(validations.isValidEmail('a@a')).toBe(true);
// });