const postUser = require('./api');
const validateInputs = require('./util');

async function inserirUsuario(data) {

    let test = validateInputs(data);

    if(!test) {
        await postUser(data)
        .then(res => {
            // console.log(res);
            // alert(`Inserted user: ${res}`);
            return true;
        }).catch(err => {
            return false;
        })
    } else {
        alert(`Preencha o campo ${test}`);
        return false;
    }
}

module.exports = inserirUsuario;