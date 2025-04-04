const URL = 'http://localhost:3000/';

const postUser = async(user) => {
    try {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }

        const response = await fetch(`${URL}user`, config);

        if (!response.ok) throw new Error();

        const data = await response.json();

        return `Inserted data: ${response.statusText}`;

    } catch (exception) {
        console.log("Error: ", exception);
    }
}

module.exports = postUser;