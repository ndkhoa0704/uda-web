const Hashids = require('hashids/cjs')

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return email !== '' && emailRegex.test(email);
}

module.exports = {
    isValidEmail: isValidEmail,
    hashids: new Hashids(process.env.SALT, 16)
}