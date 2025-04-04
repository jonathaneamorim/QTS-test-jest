// const inserirUsuario = require('./manipulationData');

// test('requisição de novo usuario', () => {
//   expect(inserirUsuario( {nome: "Joao", email: "jao@gmail.com", senha: "1234"} )).toBe(true);
// });

const inserirUser = require('../js/services/manipulationData');
const validateInputs = require('../js/services/util');

test('adds 1 + 2 to equal 3', async () => {
  expect(await inserirUser({nome: "Joao", email: "jao@gmail.com", senha: "1234"})).toBe(true);
});

test('testando validação de campos vazios', () => {
  expect(validateInputs({nome: "aaa", email: "", senha: ""})).toBe("nome");
})