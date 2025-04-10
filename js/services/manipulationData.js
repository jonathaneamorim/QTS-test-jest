const postUser = require('./api');
const validateInputs = require('./util');

function inserirUsuario(data) {

    return new Promise((retorno) => {
        let test = validateInputs(data);

        if(!test) {
            postUser(data)
            .then(res => {
                // console.log(res);
                // alert(`Inserted user: ${res}`);
                retorno(true);
            }).catch(err => {
                retorno(false);
            })
        } else {
            // alert(`Preencha o campo ${test}`);
            retorno(false);
        }
    })    
}

module.exports = inserirUsuario;