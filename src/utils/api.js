const URL = 'http://localhost:3001/'

export const getUsers = async() => {
    try {
        const response = await fetch(`${URL}user`);
        if(!response.ok) throw new Error();
        const data = await response.json();
        return data;
    } catch (exception) {
        console.log("Error: ", exception);
        return false;
    }
}