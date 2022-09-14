const validationEmail = (email) => {
    const expression = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return expression.test(String(email).toLowerCase());
};

export default validationEmail;
