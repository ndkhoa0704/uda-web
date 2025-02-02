function isValidEmail(email) {
    console.log(email);
    const emailRegex = /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return email !== '' && emailRegex.test(email);
}

module.exports = {
    isValidEmail: isValidEmail
}