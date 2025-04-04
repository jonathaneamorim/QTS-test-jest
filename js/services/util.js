const validateInputs = (data) => {

    for (const prop in data) {
        if(!data[prop].trim()) return prop;
    }
    // data.forEach(input => {
    //     if(data[input].trim()) return input;
    // });

    return false;
}

module.exports = validateInputs;