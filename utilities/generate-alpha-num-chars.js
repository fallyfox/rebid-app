export const generateAlphaNumChars = (len) => {
    let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = ""
    let charactersLength = characters.length;

    for ( let i = 0; i < len ; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result
}